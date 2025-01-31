import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize players correctly', () => {
    expect(service.player1.name).toBe('Player');
    expect(service.player1.points).toBe(0);
    expect(service.player1.type).toBe('human');
    
    expect(service.player2.name).toBe('Computer');
    expect(service.player2.points).toBe(0);
    expect(service.player2.type).toBe('computer');
  });

  it('should add points correctly', () => {
    const player = service.getCurrentPlayer();
    const initialPoints = player.points;
    player.addValue(5);
    expect(player.points).toBe(initialPoints + 5);
  });

  it('should switch players correctly', () => {
    const initialPlayer = service.getCurrentPlayer();
    service.nextPlayer();
    expect(service.getCurrentPlayer()).not.toBe(initialPlayer);
    service.nextPlayer();
    expect(service.getCurrentPlayer()).toBe(initialPlayer);
  });

  it('should reset game state correctly', () => {
    service.player1.addValue(10);
    service.player2.addValue(5);
    service.reset();
    expect(service.player1.points).toBe(0);
    expect(service.player2.points).toBe(0);
  });
});
