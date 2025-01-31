import { TestBed } from '@angular/core/testing';
import { FieldService } from './field.service';
import { Position } from '../interfaces/field.interface';

describe('FieldService', () => {
  let service: FieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldService]
    });
    service = TestBed.inject(FieldService);
  });

  it('should create a field with correct properties', () => {
    const position: Position = { x: 1, y: 2 };
    const value = 5;
    const field = service.createField(value, position);

    expect(field.value).toBe(value);
    expect(field.position).toEqual(position);
    expect(field.active).toBeFalse();
    expect(field.taken).toBeFalse();
    expect(field.points).toBe(0);
  });

  it('should handle field selection correctly', () => {
    const field = service.createField(5, { x: 0, y: 0 });
    field.active = true;

    expect(field.isSelectable()).toBeTrue();
    field.takeField();
    expect(field.isSelectable()).toBeFalse();
    expect(field.points).toBe(5);
  });
});
