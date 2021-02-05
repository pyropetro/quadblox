import Tetromino from "./Tetromino";

export default class TetrominoS extends Tetromino {
  constructor() {
    let symbol = 'S';
    let matrix: string[][] = [['', symbol, symbol],
                              [symbol, symbol, '']];
    super(symbol, matrix);
  }
}