import Tetromino from "./Tetromino";

export default class TetrominoT extends Tetromino {
  constructor() {
    let symbol = 'T';
    let matrix: string[][] = [[symbol, symbol, symbol],
                              ['', symbol, '']];
    super(symbol, matrix);
  }
}