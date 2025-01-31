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

  it('should restrict moves to exact position on first selection', () => {
    service.changeDirection({ x: 3, y: 3 });
    expect(service.isEnabled({ x: 3, y: 3 })).toBeTrue();
    expect(service.isEnabled({ x: 3, y: 4 })).toBeFalse();
    expect(service.isEnabled({ x: 4, y: 3 })).toBeFalse();
    expect(service.isEnabled({ x: 0, y: 0 })).toBeFalse();
    
    const spyConsole = jest.spyOn(console, 'error');
    service.changeDirection({ x: 4, y: 4 });
    expect(spyConsole).toHaveBeenCalledWith('Invalid move - must follow game rules');
    expect(service.isEnabled({ x: 3, y: 3 })).toBeTrue();
    spyConsole.mockRestore();
  });

  it('should handle direction changes correctly', () => {
    service.changeDirection({ x: 3, y: 3 });
    expect(service.isEnabled({ x: 3, y: 3 })).toBeTrue();
    
    service.changeDirection({ x: 3, y: 4 });
    expect(service.isEnabled({ x: 2, y: 4 })).toBeTrue();
    expect(service.isEnabled({ x: 3, y: 5 })).toBeFalse();
    
    service.changeDirection({ x: 2, y: 4 });
    expect(service.isEnabled({ x: 2, y: 5 })).toBeTrue();
    expect(service.isEnabled({ x: 1, y: 4 })).toBeFalse();
    
    const spyConsole = jest.spyOn(console, 'error');
    service.changeDirection({ x: 5, y: 5 });
    expect(spyConsole).toHaveBeenCalledWith('Invalid move - must follow game rules');
    expect(service.isEnabled({ x: 2, y: 5 })).toBeTrue();
    spyConsole.mockRestore();
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
