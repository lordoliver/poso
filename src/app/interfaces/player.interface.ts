export interface Player {
  name: string;
  points: number;
  type: 'human' | 'computer';
  addValue(value: number): number;
}
