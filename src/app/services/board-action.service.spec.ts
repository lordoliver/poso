import { TestBed } from '@angular/core/testing';
import { BoardActionService } from './board-action.service';

describe('BoardActionService', () => {
  let service: BoardActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardActionService]
    });
    service = TestBed.inject(BoardActionService);
  });

  it('should allow first move anywhere', () => {
    expect(service.isEnabled({ x: 0, y: 0 })).toBeTrue();
    expect(service.isEnabled({ x: 7, y: 7 })).toBeTrue();
  });

  it('should switch players correctly', () => {
    let currentPlayer: number | undefined;
    service.currentPlayer$.subscribe(player => currentPlayer = player);
    
    const initialPlayer = currentPlayer;
    service.nextPlayer();
    expect(currentPlayer).not.toBe(initialPlayer);
    service.nextPlayer();
    expect(currentPlayer).toBe(initialPlayer);
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
});
