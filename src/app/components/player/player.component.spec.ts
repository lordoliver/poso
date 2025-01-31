import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = { name: 'Test Player', points: 10 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display player name and points', () => {
    const element = fixture.nativeElement;
    const name = element.querySelector('.name');
    const value = element.querySelector('.value');

    expect(name.textContent).toBe('Test Player');
    expect(value.textContent).toBe('10');
  });

  it('should update when player data changes', () => {
    component.player = { name: 'New Player', points: 20 };
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const name = element.querySelector('.name');
    const value = element.querySelector('.value');

    expect(name.textContent).toBe('New Player');
    expect(value.textContent).toBe('20');
  });
});
