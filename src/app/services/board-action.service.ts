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
  private lastPosition: Position | null = null;
  private playerDirection: { [key: number]: 'horizontal' | 'vertical' | null } = {
    1: null,
    2: null
  };
  private enabled = { x: null as number | null, y: null as number | null };

  private changeDirection(position: Position): void {
    if (this.enabled.x === null && this.enabled.y === null) {
      this.enabled = { x: position.x, y: position.y };
    } else if (this.enabled.x === null && this.enabled.y !== null) {
      this.enabled = { x: position.x, y: null };
    } else if (this.enabled.x !== null && this.enabled.y === null) {
      this.enabled = { x: null, y: position.y };
    } else if (this.enabled.x !== null && this.enabled.y !== null) {
      if (this.lastPosition?.x === position.x) {
        this.enabled = { x: null, y: position.y };
      } else if (this.lastPosition?.y === position.y) {
        this.enabled = { x: position.x, y: null };
      }
    }
    this.lastPosition = position;
  }

  nextPlayer(): void {
    this.playerService.nextPlayer();
  }

  setMove(position: Position): void {
    this.changeDirection(position);
    this.updateGameState();
  }

  reset(): void {
    this.lastPosition = null;
    this.playerDirection = { 1: null, 2: null };
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

  isEnabled(position: Position): boolean {
    if (this.gameOver.value) {
      return false;
    }
    return this.enabled.x === null && this.enabled.y === null ||
           position.x === this.enabled.x ||
           position.y === this.enabled.y;
  }
}
