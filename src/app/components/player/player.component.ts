import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  name: string;
  points: number;
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  template: `<p class="player">
	<span class="name" [textContent]="player.name">Player</span>
	<span class="value" [textContent]="player.points">0</span>
</p>`,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    .player {
      margin: 0;
      padding: 0.8rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .name {
      display: inline-block;
      margin-right: 1rem;
      font-weight: bold;
      color: #333;
    }
    .value {
      display: inline-block;
      font-weight: bold;
      color: #1976d2;
    }
  `]
})
export class PlayerComponent {
  @Input({ required: true }) player!: Player;
}
