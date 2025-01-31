import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Field } from '../../interfaces/field.interface';
import { ComputerService, BoardActionService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-field',
  standalone: true,
  imports: [NgClass],
  template: `<td [ngClass]="{
	'red': negative && !field.taken,
	'green': !negative && !field.taken, 
	'disabled': !field.active
	}" (click)="take($event)">
	<b>
		<i>{{absVal}}</i>
	</b>
</td>`,
  styles: [`
    :host {
      display: table-cell;
      padding: 0;
    }
    td {
      width: 60px;
      height: 60px;
      text-align: center;
      cursor: pointer;
      padding: 10px;
      font-size: 1.2rem;
      transition: all 0.2s ease;
      user-select: none;
      position: relative;
    }
    td:hover:not(.disabled) {
      transform: scale(1.05);
    }
    td.red { 
      background: 
        linear-gradient(180deg, rgba(184,90,90,1) 0%, rgba(165,45,45,1) 100%);
      border: 0.2em solid #661915;
      color: #fff;
      font-weight: bold;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.4);
    }
    td.green { 
      background:
        linear-gradient(180deg, rgba(145,179,91,1) 0%, rgba(112,154,45,1) 100%);
      border: 0.2em solid #45591a;
      color: #fff;
      font-weight: bold;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.4);
    }
    td.disabled { 
      cursor: not-allowed;
      opacity: 0.7;
      background: linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2) 75%, transparent 75%, transparent);
      background-size: 4px 4px;
    }
    b {
      display: block;
      position: relative;
      z-index: 1;
    }
    i {
      font-style: normal;
    }
  `]
})
export class BoardFieldComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input({ required: true }) field!: Field;
  absVal: number = 0;
  negative: boolean = false;

  constructor(
    private computerService: ComputerService,
    private boardActionService: BoardActionService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.absVal = Math.abs(this.field.value);
    this.negative = this.field.value < 0;
    this.field.active = this.boardActionService.isEnabled(this.field.position);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async take(event?: MouseEvent): Promise<void> {
    event?.preventDefault();
    if (this.field.isSelectable()) {
      this.field.takeField();
      this.boardActionService.updatePoints(this.field.value);
      this.boardActionService.setMove(this.field.position);
      this.boardActionService.nextPlayer();
      if (this.computerService.isComputerTurn()) {
        await this.computerService.computerMove();
      }
    }
  }
}
