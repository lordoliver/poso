import { TestBed } from '@angular/core/testing';
import { BoardActionService } from './board-action.service';
import { PlayerService } from './player.service';

describe('BoardActionService', () => {
  let service: BoardActionService;
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardActionService, PlayerService]
    });
    service = TestBed.inject(BoardActionService);
    playerService = TestBed.inject(PlayerService);
  });

  it('should allow first move anywhere', () => {
    expect(service.isEnabled({ x: 0, y: 0 })).toBeTrue();
    expect(service.isEnabled({ x: 7, y: 7 })).toBeTrue();
  });

  it('should switch players correctly', () => {
    const initialPlayer = playerService.getCurrentPlayer();
    service.nextPlayer();
    expect(playerService.getCurrentPlayer()).not.toBe(initialPlayer);
    service.nextPlayer();
    expect(playerService.getCurrentPlayer()).toBe(initialPlayer);
  });

  it('should restrict moves after first selection', () => {
    service.setMove({ x: 3, y: 3 });
    expect(service.isEnabled({ x: 3, y: 4 })).toBeTrue();
    expect(service.isEnabled({ x: 4, y: 3 })).toBeTrue();
    expect(service.isEnabled({ x: 0, y: 0 })).toBeFalse();
  });

  it('should reset game state correctly', () => {
    service.setMove({ x: 3, y: 3 });
    service.reset();
    expect(service.isEnabled({ x: 0, y: 0 })).toBeTrue();
  });

  it('should update points correctly', () => {
    const initialPoints = playerService.getCurrentPlayer().points;
    service.updatePoints(5);
    expect(playerService.getCurrentPlayer().points).toBe(initialPoints + 5);
  });
});
