import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { BoardFieldComponent } from '../board-field/board-field.component';
import { FieldService } from '../../services/field.service';
import { BoardActionService } from '../../services/board-action.service';
import { ComputerService } from '../../services/computer.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent, BoardFieldComponent],
      providers: [FieldService, BoardActionService, ComputerService]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize 8x8 board with numbers', () => {
    expect(component.fields.length).toBe(8);
    component.fields.forEach(row => {
      expect(row.length).toBe(8);
      row.forEach(field => {
        expect(field.value).toBeDefined();
        expect(typeof field.value).toBe('number');
      });
    });
  });

  it('should have equal number of positive and negative values', () => {
    const values = component.fields.flat().map(field => field.value);
    const positiveCount = values.filter(v => v > 0).length;
    const negativeCount = values.filter(v => v < 0).length;
    expect(positiveCount).toBe(negativeCount);
  });

  it('should have values between -16 and 16 (excluding 0)', () => {
    component.fields.flat().forEach(field => {
      expect(Math.abs(field.value)).toBeGreaterThan(0);
      expect(Math.abs(field.value)).toBeLessThanOrEqual(16);
    });
  });
});
