import Tetromino from "./Tetromino";

export default class TetrominoO extends Tetromino {
  constructor() {
    let symbol = 'O';
    let matrix: string[][] = [[symbol, symbol],
                              [symbol, symbol]];
    super(symbol, matrix);
  }
}