import { TestBed } from '@angular/core/testing';
import { ComputerService } from './computer.service';
import { BoardActionService } from './board-action.service';
import { Field } from '../interfaces/field.interface';

describe('ComputerService', () => {
  let service: ComputerService;
  let boardActionService: BoardActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComputerService, BoardActionService]
    });
    service = TestBed.inject(ComputerService);
    boardActionService = TestBed.inject(BoardActionService);
  });

  it('should select highest value field', (done) => {
    const mockField: Field = {
      value: 10,
      position: { x: 0, y: 0 },
      active: true,
      taken: false,
      points: 0,
      isSelectable: () => true,
      takeField: () => {
        mockField.taken = true;
        mockField.active = false;
        mockField.points = mockField.value;
      }
    };

    service.fields = [[mockField]];
    
    service.computerMove();
    
    setTimeout(() => {
      expect(mockField.taken).toBeTrue();
      expect(mockField.points).toBe(10);
      done();
    }, 600);
  });

  it('should not move when no fields are selectable', (done) => {
    const mockField: Field = {
      value: 10,
      position: { x: 0, y: 0 },
      active: false,
      taken: true,
      points: 10,
      isSelectable: () => false,
      takeField: () => {}
    };

    service.fields = [[mockField]];
    
    service.computerMove();
    
    setTimeout(() => {
      expect(mockField.taken).toBeTrue();
      expect(mockField.points).toBe(10);
      done();
    }, 600);
  });
});
