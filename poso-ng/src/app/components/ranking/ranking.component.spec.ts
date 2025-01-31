import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingComponent } from './ranking.component';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    component.players = [
      { name: 'Player 1', points: 10 },
      { name: 'Player 2', points: 20 }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ranking title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toBe('Ranking');
  });

  it('should render all players in the list', () => {
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(2);

    const firstPlayer = listItems[0];
    expect(firstPlayer.querySelector('.name').textContent).toBe('Player 1');
    expect(firstPlayer.querySelector('.value').textContent).toBe('10');

    const secondPlayer = listItems[1];
    expect(secondPlayer.querySelector('.name').textContent).toBe('Player 2');
    expect(secondPlayer.querySelector('.value').textContent).toBe('20');
  });
});
