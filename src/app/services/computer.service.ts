import { Injectable } from '@angular/core';
import { Field } from '../interfaces/field.interface';
import { BoardActionService } from './board-action.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  fields: Field[][] = [];

  constructor(
    private boardActionService: BoardActionService,
    private playerService: PlayerService
  ) {}

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
    for (let i = 0; i < selectable.length; i++) {
      if (!highest || selectable[i].value > highest.value) {
        highest = selectable[i];
      }
    }

    if (highest) {
      highest.takeField();
      this.boardActionService.changeDirection(highest.position);
      this.boardActionService.nextPlayer();
    }
  }

  isComputerTurn(): boolean {
    return this.playerService.getCurrentPlayer().type === 'computer';
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
