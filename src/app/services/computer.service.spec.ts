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

  it('should select highest value field from multiple options', (done) => {
    const mockFields: Field[] = [
      {
        value: 5,
        position: { x: 0, y: 0 },
        active: true,
        taken: false,
        points: 0,
        isSelectable: () => true,
        takeField: () => {
          mockFields[0].taken = true;
          mockFields[0].active = false;
          mockFields[0].points = mockFields[0].value;
        }
      },
      {
        value: 10,
        position: { x: 0, y: 1 },
        active: true,
        taken: false,
        points: 0,
        isSelectable: () => true,
        takeField: () => {
          mockFields[1].taken = true;
          mockFields[1].active = false;
          mockFields[1].points = mockFields[1].value;
        }
      }
    ];

    service.fields = [mockFields];
    
    service.computerMove();
    
    setTimeout(() => {
      expect(mockFields[0].taken).toBeFalse();
      expect(mockFields[1].taken).toBeTrue();
      expect(mockFields[1].points).toBe(10);
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
