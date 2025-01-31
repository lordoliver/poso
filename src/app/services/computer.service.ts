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

  private calculateFieldScore(field: Field): number {
    const baseScore = Math.abs(field.value);
    const positionScore = (field.position.x + field.position.y) / 14; // Normalize position score
    return baseScore + positionScore;
  }

  private move(): void {
    const selectable = this.getSelectable();
    if (selectable.length === 0) {
      return;
    }

    // Sort fields by score and get top 3
    const sortedFields = selectable
      .sort((a, b) => this.calculateFieldScore(b) - this.calculateFieldScore(a))
      .slice(0, Math.min(3, selectable.length));

    // Randomly select from top fields
    const selectedField = sortedFields[Math.floor(Math.random() * sortedFields.length)];
    
    if (selectedField) {
      selectedField.takeField();
      this.boardActionService.setMove(selectedField.position);
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
