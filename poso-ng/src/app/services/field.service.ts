import { Injectable } from '@angular/core';
import { Field, Position } from '../interfaces/field.interface';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  createField(value: number, position: Position): Field {
    return {
      value,
      position,
      active: false,
      taken: false,
      points: 0,
      isSelectable(): boolean {
        return this.active && !this.taken;
      },
      takeField(): void {
        this.active = false;
        this.taken = true;
        this.points = this.value;
      }
    };
  }
}
