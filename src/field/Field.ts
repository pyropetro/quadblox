import Grid from "../Grid";

export default class Field {
  public readonly width: number;
  public readonly height: number;
  public readonly gridSize: number;
  public grid: Grid;
  private readonly _minSize: number = 8;

  constructor(
    width: number, 
    height: number, 
    gridSize: number
  ) {
    if (width < this._minSize 
      || height < this._minSize) {
        throw new Error(`Minimum grid dimensions are ${this._minSize}x${this._minSize}.`);
      }
    if (width < this._minSize 
      || height < this._minSize) {
        throw new Error(`Minimum grid dimensions are ${this._minSize}x${this._minSize}.`);
      }
    if (gridSize < this._minSize / 2) {
      throw new Error(`Minimum grid increment is ${this.gridSize}.`);
    }
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.grid = new Grid({
      width: this.width, 
      height: this.height
    });
  }

  contentsAtCoordinates(x: number, y: number): string {
    let contents = this.grid.matrix[y][x];
    return contents;
  }

  setContentsAtCoordinates(x: number, y: number, contents: string) {
    this.grid.matrix[y][x] = contents;
  }


}