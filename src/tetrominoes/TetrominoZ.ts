import Tetromino from "./Tetromino";

export default class TetrominoZ extends Tetromino {
  constructor() {
    let symbol = 'Z';
    let matrix: string[][] = [[symbol, symbol, ''],
                              ['', symbol, symbol]];
    super(symbol, matrix);
  }
}