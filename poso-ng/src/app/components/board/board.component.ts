import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardFieldComponent } from '../board-field/board-field.component';
import { Field, Position } from '../../interfaces/field.interface';
import { FieldService, BoardActionService, ComputerService } from '../../services';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardFieldComponent],
  template: `<table class="board">
    <tbody>
      <tr *ngFor="let row of fields; let i = index">
        <app-board-field *ngFor="let field of row; let j = index" [field]="field"></app-board-field>
      </tr>
    </tbody>
  </table>`,
  styles: [`
    :host {
      display: block;
      margin: 1rem;
    }
    .board {
      border-collapse: collapse;
      margin: 0 auto;
      background-color: #f5f5f5;
      border: 2px solid #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    tr {
      display: table-row;
    }
  `]
})
export class BoardComponent implements OnInit {
  private readonly borderFields = 8;
  private readonly maxNumber = 16;
  fields: Field[][] = [];

  constructor(
    private fieldService: FieldService,
    private boardActionService: BoardActionService,
    private computerService: ComputerService
  ) {}

  ngOnInit(): void {
    this.createFields();
    this.boardActionService.nextPlayer();
  }

  private createFields(): void {
    const numbers = this.getRandomNumbers();
    this.fields = Array(this.borderFields).fill(null).map((_, x) =>
      Array(this.borderFields).fill(null).map((_, y) => 
        this.fieldService.createField(numbers.pop() ?? 0, { x, y })
      )
    );
    this.computerService.fields = this.fields;
  }

  private getRandomNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= this.maxNumber; i++) {
      numbers.push(i, -i, i, -i);
    }
    
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers;
  }

  getPositionOfField(field: Field): Position {
    return field.position;
  }
}
