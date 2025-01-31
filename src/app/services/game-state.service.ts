import { Injectable } from '@angular/core';
import { BoardActionService } from './board-action.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  constructor(private boardActionService: BoardActionService) {}

  reset(): void {
    this.boardActionService.reset();
  }
}
