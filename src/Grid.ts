import IRectangle from "./interfaces/IRectangle";
import IPointCallback from "./interfaces/IPointCallback";

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

  get width(): number {
    return this.matrix[0].length;
  }
  get height(): number {
    return this.matrix.length;
  }

  getContentsAtCoordinates(x: number, y: number): string {
    return this.matrix[y][x];
  }

  setContentsAtCoordinates(x: number, y: number, contents: string) {
    this.matrix[y][x] = contents;
  }

  forEachPoint(callback: IPointCallback): boolean {
    for (let h=0; h<this.height; h++) {
      for (let w=0; w<this.width; w++) {
        let contentsAtPoint = this.getContentsAtCoordinates(w, h);
        if (!callback(w, h, contentsAtPoint)) {
          return false;
        }
      }
    }
    return true;
  }
}