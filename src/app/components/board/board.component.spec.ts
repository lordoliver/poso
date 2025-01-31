import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Field } from '../../interfaces/field.interface';
import { BoardComponent } from './board.component';
import { BoardFieldComponent } from '../board-field/board-field.component';
import { FieldService } from '../../services/field.service';
import { BoardActionService } from '../../services/board-action.service';
import { ComputerService } from '../../services/computer.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let computerService: jasmine.SpyObj<ComputerService>;
  let boardActionService: BoardActionService;

  beforeEach(fakeAsync(() => {
    computerService = jasmine.createSpyObj('ComputerService', ['computerMove', 'isComputerTurn']);
    computerService.computerMove.and.returnValue(Promise.resolve());
    computerService.isComputerTurn.and.returnValue(false);

    TestBed.configureTestingModule({
      imports: [BoardComponent, BoardFieldComponent],
      providers: [
        FieldService,
        BoardActionService,
        { provide: ComputerService, useValue: computerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    boardActionService = TestBed.inject(BoardActionService);
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize 8x8 board with numbers', () => {
    expect(component.fields.length).toBe(8);
    component.fields.forEach((row: Field[]) => {
      expect(row.length).toBe(8);
      row.forEach((field: Field) => {
        expect(field.value).toBeDefined();
        expect(typeof field.value).toBe('number');
      });
    });
  });

  it('should have equal number of positive and negative values', () => {
    const values = component.fields.flat().map((field: Field) => field.value);
    const positiveCount = values.filter((v: number) => v > 0).length;
    const negativeCount = values.filter((v: number) => v < 0).length;
    expect(positiveCount).toBe(negativeCount);
  });

  it('should have values between -16 and 16 (excluding 0)', () => {
    component.fields.flat().forEach((field: Field) => {
      expect(Math.abs(field.value)).toBeGreaterThan(0);
      expect(Math.abs(field.value)).toBeLessThanOrEqual(16);
    });
  });
});
