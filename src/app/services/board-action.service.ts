import { Injectable } from '@angular/core';
import { Position, Field } from '../interfaces/field.interface';
import { BehaviorSubject } from 'rxjs';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class BoardActionService {
  private gameOver = new BehaviorSubject<boolean>(false);
  gameOver$ = this.gameOver.asObservable();

  constructor(private playerService: PlayerService) {}
  
  private fields: Field[][] = [];
  private currentPosition: Position | null = null;
  private enabled = { x: null as number | null, y: null as number | null };

  changeDirection(position: Position): void {
    if (!this.isEnabled(position)) {
      console.error('Invalid move - must follow game rules');
      return;
    }

    if (this.enabled.x === null && this.enabled.y === null) {
      this.enabled = { x: position.x, y: position.y };
    } else if (this.enabled.x === null && this.enabled.y !== null) {
      this.enabled = { x: position.x, y: null };
    } else if (this.enabled.x !== null && this.enabled.y === null) {
      this.enabled = { x: null, y: position.y };
    } else {
      if (this.currentPosition?.x === position.x) {
        this.enabled = { x: null, y: position.y };
      } else if (this.currentPosition?.y === position.y) {
        this.enabled = { x: position.x, y: null };
      } else {
        console.error('error! you should not come here!');
        return;
      }
    }
    
    this.currentPosition = position;
    this.updateGameState();
  }

  nextPlayer(): void {
    this.playerService.nextPlayer();
  }

  reset(): void {
    this.currentPosition = null;
    this.enabled = { x: null, y: null };
    this.gameOver.next(false);
    this.fields = [];
    this.playerService.reset();
  }

  updatePoints(value: number): void {
    this.playerService.getCurrentPlayer().addValue(value);
  }

  setFields(fields: Field[][]): void {
    this.fields = fields;
  }

  private checkGameOver(): boolean {
    if (!this.fields.length) return false;
    return this.fields.flat().every(field => !field.isSelectable());
  }

  private updateGameState(): void {
    if (this.checkGameOver()) {
      this.gameOver.next(true);
    }
  }

  private canMove(): boolean {
    return !this.gameOver.value;
  }

  isEnabled(position: Position): boolean {
    if (!this.canMove()) return false;
    
    if (this.enabled.x === null && this.enabled.y === null) {
      return true;
    }
    
    if (this.currentPosition) {
      return position.x === this.enabled.x || position.y === this.enabled.y;
    }
    
    return position.x === this.enabled.x && position.y === this.enabled.y;
  }
}
