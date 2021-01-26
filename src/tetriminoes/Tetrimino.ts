import Grid from '../Grid';
import ITetrimino from './ITetrimino'

export default class Tetrimino {
  grid: Grid;
  readonly symbol: string;
  /* private _width: number;
  private _height: number; */
  x: number;
  y: number;
  /* constructor() {
    
  } */

  constructor(symbol: string, matrix: string[][]) {
    this.symbol = symbol;
    this.grid = new Grid(matrix);
  }

  get width(): number {
    return this.grid.matrix[0].length;
  }
  get height(): number {
    return this.grid.matrix.length;
  }



}