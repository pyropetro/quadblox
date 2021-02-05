import Tetromino from "./Tetromino";

export default class TetrominoL extends Tetromino {
  constructor() {
    let symbol = 'L';
    let matrix: string[][] = [[symbol, ''],
                              [symbol, ''],
                              [symbol, symbol]];
    super(symbol, matrix);
  }
}