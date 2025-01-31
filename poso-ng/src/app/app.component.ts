import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  BoardComponent,
  RankingComponent,
  RulesComponent,
  MenuComponent,
  PlayerComponent
} from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardComponent, RankingComponent, RulesComponent, MenuComponent, PlayerComponent],
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
  menuItems = [
    { 
      name: 'New Game',
      cssClass: 'new-game',
      action: () => window.location.reload()
    },
    {
      name: 'Rules',
      cssClass: 'rules',
      action: () => console.log('Show rules')
    }
  ];
}
