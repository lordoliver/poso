import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BoardComponent,
  RankingComponent,
  RulesComponent,
  MenuComponent,
  PlayerComponent
} from './components';
import { GameStateService, BoardActionService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoardComponent, RankingComponent, RulesComponent, MenuComponent, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'POSO';
  currentPlayer = { name: 'Player 1', points: 0 };
  players = [
    { name: 'Player', points: 0 },
    { name: 'Computer', points: 0 }
  ];
  menuItems: { name: string; cssClass: string; action: () => void; }[] = [
    { 
      name: 'New Game',
      cssClass: 'new-game',
      action: () => {
        this.gameStateService.reset();
      }
    },
    {
      name: 'Rules',
      cssClass: 'rules',
      action: () => console.log('Show rules')
    }
  ];

  constructor(
    private gameStateService: GameStateService,
    private boardActionService: BoardActionService
  ) {
    this.boardActionService.player1Points$.subscribe((points: number) => {
      this.players[0].points = points;
    });
    this.boardActionService.player2Points$.subscribe((points: number) => {
      this.players[1].points = points;
    });
  }
}
