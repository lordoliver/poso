export interface Position {
  x: number;
  y: number;
}

export interface Field {
  value: number;
  position: Position;
  active: boolean;
  taken: boolean;
  points: number;
  isSelectable(): boolean;
  takeField(): void;
}
