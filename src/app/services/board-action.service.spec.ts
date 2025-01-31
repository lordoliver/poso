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
    service.changeDirection({ x: 3, y: 3 });
    // After first move, both row and column should be enabled
    expect(service.isEnabled({ x: 3, y: 4 })).toBeTrue(); // Same row
    expect(service.isEnabled({ x: 4, y: 3 })).toBeTrue(); // Same column
    expect(service.isEnabled({ x: 0, y: 0 })).toBeFalse(); // Different row and column
  });

  it('should handle direction changes correctly', () => {
    // First move enables both row and column
    service.changeDirection({ x: 3, y: 3 });
    expect(service.isEnabled({ x: 3, y: 4 })).toBeTrue();
    expect(service.isEnabled({ x: 4, y: 3 })).toBeTrue();

    // Moving in same row switches to column-only
    service.changeDirection({ x: 3, y: 4 });
    expect(service.isEnabled({ x: 3, y: 5 })).toBeFalse(); // Same row not allowed
    expect(service.isEnabled({ x: 2, y: 4 })).toBeTrue();  // Same column allowed
    
    // Moving in new column switches to row-only
    service.changeDirection({ x: 2, y: 4 });
    expect(service.isEnabled({ x: 2, y: 5 })).toBeTrue();  // Same row allowed
    expect(service.isEnabled({ x: 1, y: 4 })).toBeFalse(); // Same column not allowed
  });

  it('should reset game state correctly', () => {
    service.changeDirection({ x: 3, y: 3 });
    service.reset();
    expect(service.isEnabled({ x: 0, y: 0 })).toBeTrue();
  });

  it('should update points correctly', () => {
    const initialPoints = playerService.getCurrentPlayer().points;
    service.updatePoints(5);
    expect(playerService.getCurrentPlayer().points).toBe(initialPoints + 5);
  });
});
