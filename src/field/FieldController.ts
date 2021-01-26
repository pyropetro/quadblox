import Tetrimino from "../tetriminoes/Tetrimino";
import TetriminoI from "../tetriminoes/TetriminoI";
import Field from "./Field";

export default class FieldController {
  field: Field;
  currentPiece: TetriminoI;

  constructor(field: Field) {
    this.field = field;
  }

  addPiece() {
    this.currentPiece = new TetriminoI();

    let center = Math.floor(this.field.width / 2);
    let x = center - Math.ceil(this.currentPiece.width / 2);

    if (this.canAddPiece(this.currentPiece, x)) {
      for (let h=0; h<this.currentPiece.height; h++) {
        for (let w=0; w<this.currentPiece.width; w++) {
          this.field.setContentsAtCoordinates(x + w, h, this.currentPiece.symbol);
        }
      }
    }
    
  }

  canAddPiece(piece: Tetrimino, x: number): boolean {
    for (let h=0; h<piece.height; h++) {
      for (let w=0; w<piece.width; w++) {
        if (!this.hasEmptySpaceAt(x + w, h)) {
          return false;
        }
      }
    }
    return true;
  }

  hasEmptySpaceAt(x: number, y: number): boolean {
    return this.field.contentsAtCoordinates(x, y) === '';
  }
}