import Tetromino from "../tetrominoes/Tetromino";
import TetrominoI from "../tetrominoes/TetrominoI";
import Field from "./Field";
import { Direction } from "../Direction";

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
    /* Add piece type randomizer once all piece types have been created */
    this.currentPiece = new TetrominoI();

    let center = Math.floor(this.field.width / 2);
    let x = center - Math.ceil(this.currentPiece.width / 2);

    this.currentPiece.x = x;
    this.currentPiece.y = 0;

    return this.attemptToPlacePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
  }

  attemptToPlacePiece(piece: Tetromino, x: number, y: number) {
    if (this.canPlacePiece(piece, x, y)) {
      this.clearPreviousPosition();
      for (let h=0; h<piece.height; h++) {
        for (let w=0; w<piece.width; w++) {
          this.field.setContentsAtCoordinates(x + w, y + h, piece.symbol);
          this.previousCoordinates.push([x + w, y + h]);
        }
      }
      return true;
    }
    return false;
  }

  clearPreviousPosition(): void {
    for (let point=0; point<this.previousCoordinates.length; point++) {
      const x = this.previousCoordinates[point][0];
      const y = this.previousCoordinates[point][1];
      this.field.setContentsAtCoordinates(x, y, '');
    }
    this.previousCoordinates = [];
  }

  attemptToMovePiece(direction: Direction): boolean {
    /* let x: number = this.currentPiece.x;
    let y: number = this.currentPiece.y; */
    switch (direction) {
      case "DOWN":
        this.currentPiece.y++;
        let moveSuccessful = this.attemptToPlacePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
        if (!moveSuccessful) {
          this.currentPiece = null;
        }
        return moveSuccessful;
      case "LEFT":
        this.currentPiece.x--;
        break;
      case "RIGHT":
        this.currentPiece.x++;
        break;
      default:
        return false;
    }
    return this.attemptToPlacePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
  }

  /* movePiece() {
    console.log('moving');
    this.currentPiece.y --;
  } */

  canPlacePiece(piece: Tetromino, x: number, y: number): boolean {
    for (let h=0; h<piece.height; h++) {
      for (let w=0; w<piece.width; w++) {
        const xOffset = x + w;
        const yOffset = y + h;
        const isOutOfBounds = xOffset < 0 ||
          xOffset > this.field.width - 1 ||
          yOffset < 0 ||
          yOffset > this.field.height - 1;
        if (isOutOfBounds) {
          return false;
        }
        const contentsAtCoordinates = this.field.contentsAtCoordinates(xOffset, yOffset);
        const isOccupiedSpace = contentsAtCoordinates !== piece.symbol && 
        contentsAtCoordinates !== '';
        if (isOccupiedSpace) {
          return false;
        }
      }
    }
    return true;
  }

  hasEmptySpaceAt(x: number, y: number): boolean {
    const hasEmptySpace = this.field.contentsAtCoordinates(x, y) === '';
    return hasEmptySpace;
  }


}