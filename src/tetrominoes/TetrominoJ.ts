import Tetromino from "./Tetromino";

export default class TetrominoJ extends Tetromino {
  constructor() {
    let symbol = 'J';
    let matrix: string[][] = [['', symbol],
                              ['', symbol],
                              [symbol, symbol]];
    super(symbol, matrix);
  }
}