import { Injectable } from '@angular/core';
import { Position, Field } from '../interfaces/field.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardActionService {
  private currentPlayer = new BehaviorSubject<number>(Math.random() < 0.5 ? 1 : 2);
  currentPlayer$ = this.currentPlayer.asObservable();
  
  private player1Points = new BehaviorSubject<number>(0);
  player1Points$ = this.player1Points.asObservable();
  
  private player2Points = new BehaviorSubject<number>(0);
  player2Points$ = this.player2Points.asObservable();
  
  private gameOver = new BehaviorSubject<boolean>(false);
  gameOver$ = this.gameOver.asObservable();
  
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
    const next = this.currentPlayer.value === 1 ? 2 : 1;
    this.currentPlayer.next(next);
  }

  setMove(position: Position): void {
    this.changeDirection(position);
    this.updateGameState();
  }

  reset(): void {
    this.lastPosition = null;
    this.playerDirection = { 1: null, 2: null };
    this.enabled = { x: null, y: null };
    this.currentPlayer.next(Math.random() < 0.5 ? 1 : 2);
    this.gameOver.next(false);
    this.fields = [];
    this.player1Points.next(0);
    this.player2Points.next(0);
  }

  updatePoints(value: number): void {
    const currentPlayer = this.currentPlayer.value;
    if (currentPlayer === 1) {
      this.player1Points.next(this.player1Points.value + value);
    } else {
      this.player2Points.next(this.player2Points.value + value);
    }
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
