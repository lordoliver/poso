import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    this.menuItems = [
    { 
      name: 'New Game',
      cssClass: 'new-game',
      action: () => {
        this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
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
