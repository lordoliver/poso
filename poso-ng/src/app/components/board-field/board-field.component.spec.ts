import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardFieldComponent } from './board-field.component';
import { ComputerService } from '../../services/computer.service';
import { BoardActionService } from '../../services/board-action.service';
import { Field } from '../../interfaces/field.interface';

describe('BoardFieldComponent', () => {
  let component: BoardFieldComponent;
  let fixture: ComponentFixture<BoardFieldComponent>;
  let boardActionService: BoardActionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardFieldComponent],
      providers: [ComputerService, BoardActionService]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardFieldComponent);
    component = fixture.componentInstance;
    boardActionService = TestBed.inject(BoardActionService);

    component.field = {
      value: 5,
      position: { x: 0, y: 0 },
      active: true,
      taken: false,
      points: 0,
      isSelectable: () => true,
      takeField: () => {
        component.field.taken = true;
        component.field.active = false;
        component.field.points = component.field.value;
      }
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display absolute value', () => {
    component.field.value = -5;
    fixture.detectChanges();
    expect(component.absVal).toBe(5);
    expect(component.negative).toBeTrue();
  });

  it('should handle field selection', () => {
    const tdElement = fixture.nativeElement.querySelector('td');
    tdElement.click();
    fixture.detectChanges();

    expect(component.field.taken).toBeTrue();
    expect(component.field.active).toBeFalse();
    expect(component.field.points).toBe(5);
  });

  it('should apply correct CSS classes', () => {
    const tdElement = fixture.nativeElement.querySelector('td');
    
    component.field.value = 5;
    fixture.detectChanges();
    expect(tdElement.classList.contains('green')).toBeTrue();
    
    component.field.value = -5;
    fixture.detectChanges();
    expect(tdElement.classList.contains('red')).toBeTrue();
    
    component.field.active = false;
    fixture.detectChanges();
    expect(tdElement.classList.contains('disabled')).toBeTrue();
  });
});
