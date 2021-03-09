import Grid from '../Grid';
import ITetromino from './ITetromino'

export default class Tetromino {
  readonly symbol: string;
  grid: Grid;
  /* private _width: number;
  private _height: number; */
  x: number;
  y: number;
  /* constructor() {
    
  } */

  constructor(symbol: string, matrix: string[][]) {
    this.symbol = symbol;
    this.grid = new Grid(matrix);
    this.x = 0;
    this.y = 0;
  }

  rotate(): void {
    
  }



}