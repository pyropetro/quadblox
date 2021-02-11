import IRectangle from "./interfaces/IRectangle";

export default class Grid {
  matrix: string[][];

  constructor(value: IRectangle | string[][]) {
    this.matrix = this._initializeMatrix(value);
  }

  private _initializeMatrix(value: IRectangle | string[][]): string[][] {
    let matrix: string[][] = [];
    if ('width' in value) {
      for (let h=0; h<value.height; h++) {
        matrix[h] = [];
        for (let w=0; w<value.width; w++) {
          matrix[h][w] = '';
        }
      }
    } else {
      matrix = value;
    }

    return matrix;
  }

  contentsAtCoordinates(x: number, y: number): string {
    return this.matrix[y][x];
  }
}