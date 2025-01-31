import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player1: Player;
  player2: Player;
  private playerFlag: boolean;

  constructor() {
    this.player1 = {
      name: 'Player',
      points: 0,
      type: 'human',
      addValue(value: number): number {
        return this.points += value;
      }
    };
    
    this.player2 = {
      name: 'Computer',
      points: 0,
      type: 'computer',
      addValue(value: number): number {
        return this.points += value;
      }
    };
    
    this.playerFlag = Math.round(Math.random()) === 0;
  }

  getCurrentPlayer(): Player {
    return this.playerFlag ? this.player1 : this.player2;
  }

  nextPlayer(): void {
    this.playerFlag = !this.playerFlag;
  }

  reset(): void {
    this.player1.points = 0;
    this.player2.points = 0;
    this.playerFlag = Math.round(Math.random()) === 0;
  }
}
