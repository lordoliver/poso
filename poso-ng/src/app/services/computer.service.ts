import { Injectable } from '@angular/core';
import { Field } from '../interfaces/field.interface';
import { BoardActionService } from './board-action.service';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  fields: Field[][] = [];

  constructor(private boardActionService: BoardActionService) {}

  private getSelectable(): Field[] {
    const selectable: Field[] = [];
    for (let x = 0; x < this.fields.length; x++) {
      for (let y = 0; y < this.fields[x].length; y++) {
        if (this.fields[x][y].isSelectable()) {
          selectable.push(this.fields[x][y]);
        }
      }
    }
    return selectable;
  }

  private move(): void {
    const selectable = this.getSelectable();
    if (selectable.length === 0) {
      return;
    }

    let highest: Field | null = null;
    for (const field of selectable) {
      if (highest === null || field.value > highest.value) {
        highest = field;
      }
    }

    if (highest) {
      highest.takeField();
      this.boardActionService.setMove(highest.position);
      this.boardActionService.nextPlayer();
    }
  }

  computerMove(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.move();
        resolve();
      }, 500);
    });
  }
}
