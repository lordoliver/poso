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
	}" (click)="take()">
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
      border: 1px solid #ccc;
      padding: 10px;
      font-size: 1.2rem;
      transition: all 0.2s ease;
      user-select: none;
    }
    td:hover:not(.disabled) {
      background-color: rgba(0, 0, 0, 0.05);
      transform: scale(1.05);
    }
    td.red { 
      color: #d32f2f;
      font-weight: bold;
    }
    td.green { 
      color: #388e3c;
      font-weight: bold;
    }
    td.disabled { 
      background-color: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.7;
    }
    b {
      display: block;
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
    
    this.subscription.add(
      this.boardActionService.currentPlayer$.subscribe(() => {
        this.field.active = this.boardActionService.isEnabled(this.field.position);
      })
    );

    this.subscription.add(
      this.boardActionService.currentPlayer$.subscribe(() => {
        if (this.field.taken) {
          this.absVal = Math.abs(this.field.points);
          this.negative = this.field.points < 0;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async take(): Promise<void> {
    if (this.field.isSelectable()) {
      this.field.takeField();
      this.boardActionService.setMove(this.field.position);
      this.boardActionService.nextPlayer();
      await this.computerService.computerMove();
    }
  }
}
