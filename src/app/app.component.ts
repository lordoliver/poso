import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BoardComponent,
  RankingComponent,
  RulesComponent,
  MenuComponent,
  PlayerComponent
} from './components';
import { GameStateService } from './services/game-state.service';

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
    { name: 'Player 1', points: 0 },
    { name: 'Computer', points: 0 }
  ];
  menuItems: { name: string; cssClass: string; action: () => void; }[];

  constructor(private gameStateService: GameStateService) {
    this.menuItems = [
    { 
      name: 'New Game',
      cssClass: 'new-game',
      action: () => {
        this.gameStateService.resetGame();
      }
    },
    {
      name: 'Rules',
      cssClass: 'rules',
      action: () => console.log('Show rules')
    }
    ];
  }
}
