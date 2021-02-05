import Tetromino from "./Tetromino";

export default class TetrominoI extends Tetromino {
  constructor() {
    let symbol = 'I';
    let matrix: string[][] = [[symbol],
                              [symbol],
                              [symbol],
                              [symbol]];
    super(symbol, matrix);
  }
}