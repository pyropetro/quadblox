import Grid from "../Grid";
import ITetrimino from "./ITetrimino";
import Tetrimino from "./Tetrimino";

export default class TetriminoI extends Tetrimino {

  constructor() {
    let symbol = 'I';
    let matrix: string[][] = [];

    for (let i=0; i<4; i++) {
      matrix.push([symbol]);
    }
    super(symbol, matrix);
  }
}