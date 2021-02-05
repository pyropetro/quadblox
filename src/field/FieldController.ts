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
import { random } from "lodash";

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
    let newPiece = this.generateRandomPiece();

    let center = Math.floor(this.field.width / 2);
    let x = center - Math.ceil(newPiece.width / 2);

    newPiece.x = x;
    newPiece.y = 0;

    return this.attemptToPlacePiece(newPiece, newPiece.x, newPiece.y);
  }

  generateRandomPiece(): Tetromino {
    let newPiece: Tetromino = null;
    let types = Object.entries(TetrominoType);
    const randomNumber = Math.floor(Math.random() * (types.length / 2)) ;
    /* console.log(types);
    console.log(randomNumber); */
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

  attemptToPlacePiece(piece: Tetromino, x: number, y: number) {
    if (this.canPlacePiece(piece, x, y)) {
      this.clearPreviousPosition();
      this.currentPiece = piece;
      this.previousCoordinates = [];
      for (let h=0; h<piece.height; h++) {
        for (let w=0; w<piece.width; w++) {
          let character = piece.grid.matrix[h][w];
          if (character) {
            this.field.setContentsAtCoordinates(x + w, y + h, character);
            this.previousCoordinates.push([x + w, y + h]);
          }
          
        }
      }
      return true;
    }
    return false;
  }

  clearPreviousPosition(): void {
    if (this.currentPiece) {
      for (let point=0; point<this.previousCoordinates.length; point++) {
        const x = this.previousCoordinates[point][0];
        const y = this.previousCoordinates[point][1];
        this.field.setContentsAtCoordinates(x, y, '');
      }
      this.previousCoordinates = [];
    }
  }

  attemptToMovePiece(direction: Direction): boolean {
    /* let x: number = this.currentPiece.x;
    let y: number = this.currentPiece.y; */
    switch (direction) {
      case "DOWN":
        let moveSuccessful = this.attemptToPlacePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y + 1);
        if (!moveSuccessful) {
          this.cementPiece();
        } else {
          this.currentPiece.y++;
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
        if (piece.grid.matrix[h][w] === '') {
          continue;
        }
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

  cementPiece(): void {
    let piece = this.currentPiece;
    for (let h=0; h<piece.height; h++) {
      for (let w=0; w<piece.width; w++) {
        const xOffset = piece.x + w;
        const yOffset = piece.y + h;
        const contents: string = this.field.contentsAtCoordinates(xOffset, yOffset);
        this.field.setContentsAtCoordinates(xOffset, yOffset, contents.toLowerCase());
      }
    }
    this.currentPiece = null;
  }


}