import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  name: string;
  points: number;
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Ranking</h2>
<ul>
	<li *ngFor="let player of players"><span class="name">{{player.name}}</span><span class="value">{{player.points}}</span></li>
</ul>`,
  styles: [`
    :host {
      display: block;
      margin-top: 1rem;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    li:last-child {
      border-bottom: none;
    }
    .name, .value {
      display: inline-block;
      margin-right: 1rem;
    }
    .value {
      font-weight: bold;
    }
  `]
})
export class RankingComponent {
  @Input() players: Player[] = [];
}
