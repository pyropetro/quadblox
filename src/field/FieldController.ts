import Field from "./Field";
import { Direction } from "../Direction";
import { TetrominoType } from "../TetrominoType";
import Tetromino from "../tetrominoes/Tetromino";
import TetrominoI from "../tetrominoes/TetrominoI";
import TetrominoO from "../tetrominoes/TetrominoO";
import TetrominoT from "../tetrominoes/TetrominoT";
import TetrominoS from "../tetrominoes/TetrominoS";
import TetrominoZ from "../tetrominoes/TetrominoZ";
import TetrominoL from "../tetrominoes/TetrominoL";
import TetrominoJ from "../tetrominoes/TetrominoJ";

export default class FieldController {
  field: Field;
  currentPiece: Tetromino;
  previousCoordinates: number[][];

  constructor(field: Field) {
    this.field = field;
    this.previousCoordinates = [];
  }

  get hasCurrentPiece(): boolean {
    return this.currentPiece !== null &&
      this.currentPiece !== undefined;
  }

  addPiece():boolean {
    let newPiece = this.generateRandomPiece();

    let center = Math.floor(this.field.grid.width / 2);
    let x = center - Math.ceil(newPiece.grid.width / 2);

    newPiece.x = x;
    newPiece.y = 0;

    return this.attemptToPlacePiece(newPiece);
  }

  generateRandomPiece(): Tetromino {
    let newPiece: Tetromino = null;
    let types = Object.entries(TetrominoType);
    const randomNumber = Math.floor(Math.random() * (types.length / 2));
    switch (randomNumber) {
      case 0:
        newPiece = new TetrominoI();
        break;
      case 1:
        newPiece = new TetrominoO();
        break;
      case 2:
        newPiece = new TetrominoT();
        break;
      case 3:
        newPiece = new TetrominoS();
        break;
      case 4:
        newPiece = new TetrominoZ();
        break;
      case 5:
        newPiece = new TetrominoL();
        break;
      case 6:
        newPiece = new TetrominoJ();
        break;
      default:
        throw new Error(`Tetromino type ${randomNumber} does not exist`);
    }
    return newPiece;
  }

  attemptToPlacePiece(piece: Tetromino, x=piece.x, y=piece.y) {
    if (this.canPlacePiece(piece, x, y)) {
      this.clearPreviousPosition();
      this.currentPiece = piece;
      this.previousCoordinates = [];
      piece.grid.forEachPoint((width: number, height: number, contentsAtPoint: string) => {
        /* let character = piece.grid.getContentsAtCoordinates(width, height); */
        if (contentsAtPoint !== '') {
          const xOffset = x + width;
          const yOffset = y + height;
          this.field.grid.setContentsAtCoordinates(xOffset, yOffset, contentsAtPoint);
          this.previousCoordinates.push([xOffset, yOffset]);
        }
        return true;
      });
      return true;
    }
    return false;
  }

  clearPreviousPosition(): void {
    if (this.currentPiece) {
      for (let point=0; point<this.previousCoordinates.length; point++) {
        const x = this.previousCoordinates[point][0];
        const y = this.previousCoordinates[point][1];
        this.field.grid.setContentsAtCoordinates(x, y, '');
      }
      this.previousCoordinates = [];
    }
  }

  attemptToMovePiece(direction: Direction): void {
    let moveSuccessful: boolean;
    let x: number = this.currentPiece.x;
    let y: number = this.currentPiece.y;
    switch (direction) {
      case "DOWN":
        moveSuccessful = this.attemptToPlacePiece(this.currentPiece, x, y + 1);
        if (!moveSuccessful) {
          this.cementPiece();
          this._checkForCompletedLines();
        } else {
          this.currentPiece.y++;
        }
        return;
      case "LEFT":
        x--;
        break;
      case "RIGHT":
        x++;
        break;
      default:
        break;
    }
    moveSuccessful = this.attemptToPlacePiece(this.currentPiece, x, y);
    if (moveSuccessful) {
      this.currentPiece.x = x;
      this.currentPiece.y = y;
    }
  }

  /* movePiece() {
    console.log('moving');
    this.currentPiece.y --;
  } */

  canPlacePiece(piece: Tetromino, x: number, y: number): boolean {
    let result = piece.grid.forEachPoint((width: number, height: number, contentsAtPoint) => {
      if (contentsAtPoint === '') {
        return true;
      }
      const xOffset = x + width;
      const yOffset = y + height;
      const isOutOfBounds = xOffset < 0 ||
        xOffset > this.field.grid.width - 1 ||
        yOffset < 0 ||
        yOffset > this.field.grid.height - 1;
      if (isOutOfBounds) {
        return false;
      }
      const contentsAtCoordinates = this.field.grid.getContentsAtCoordinates(xOffset, yOffset);
      const isOccupiedSpace = contentsAtCoordinates !== piece.symbol && 
      contentsAtCoordinates !== '';
      if (isOccupiedSpace) {
        return false;
      }
      return true;
    });
    return result;
  }

  hasEmptySpaceAt(x: number, y: number): boolean {
    const hasEmptySpace = this.field.grid.getContentsAtCoordinates(x, y) === '';
    return hasEmptySpace;
  }

  cementPiece(): void {
    let piece = this.currentPiece;
    piece.grid.forEachPoint((width: number, height: number, contentsAtPoint: string) => {
      const xOffset = piece.x + width;
      const yOffset = piece.y + height;
      const contents: string = this.field.grid.getContentsAtCoordinates(xOffset, yOffset);
      this.field.grid.setContentsAtCoordinates(xOffset, yOffset, contents.toLowerCase());
      return true;
    })
    this.currentPiece = null;
  }

  private _checkForCompletedLines() {
    /* for each line in the grid
    if every space in the line is full
    empty all those spaces
    splice that line, then unshift it back to the top of the grid  */
    let emptyLines: string[][] = [];
    for (let h=0; h<this.field.grid.height; h++) {
      let line = this.field.grid.matrix[h];
      let isCompletedLine = line.every((point, index) => !this.hasEmptySpaceAt(index, h));
      if (isCompletedLine) {
        /* emptyLines.push(h); */
        this.field.grid.matrix[h].forEach((point, index) => this.field.grid.setContentsAtCoordinates(index, h, ''));
        let emptyLine = this.field.grid.matrix[h].splice(h, 1);
        emptyLines.push(emptyLine);
      }
    }
    this.field.grid.matrix.unshift(...emptyLines);
  }


}