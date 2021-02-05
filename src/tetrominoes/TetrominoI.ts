import Grid from "../Grid";
import ITetromino from "./ITetromino";
import Tetromino from "./Tetromino";

export default class TetrominoI extends Tetromino {

  constructor() {
    let symbol = 'I';
    let matrix: string[][] = [];

    for (let i=0; i<4; i++) {
      matrix.push([symbol]);
    }
    super(symbol, matrix);
  }
}