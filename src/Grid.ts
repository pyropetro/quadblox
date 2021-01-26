import IDimensions from "./IDimensions";

export default class Grid {
  matrix: string[][];

  constructor(value: IDimensions | string[][]) {
    this.matrix = this._initializeMatrix(value);
  }

  private _initializeMatrix(value: IDimensions | string[][]): string[][] {
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
}