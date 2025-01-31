import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  name: string;
  cssClass: string;
  action: (context: any) => void;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<a *ngFor="let menuItem of menuItems" href="" class="{{menuItem.cssClass}}" [innerHTML]="menuItem.name" (click)="$event.preventDefault(); menuItem.action()"></a>`,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    a {
      display: block;
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
      text-decoration: none;
      color: #333;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    a:hover {
      background-color: #f5f5f5;
      transform: translateX(5px);
    }
    a:active {
      background-color: #e0e0e0;
    }
  `]
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
