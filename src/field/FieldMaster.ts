/* interface Size {
  [index: string]: number;
  width: number;
  height: number;
} */

import Field from "./Field";
import FieldController from "./FieldController";
import FieldRenderer from './FieldRenderer'
import { Direction } from "../Direction";

export default class FieldMaster {
  private _field: Field;
  private _fieldRenderer: FieldRenderer;
  private _fieldController: FieldController;
  private _speed: number;
  timer: NodeJS.Timeout;

  constructor(fieldId: string) {
    const width: number = 14; 
    const height: number = 28; 
    const gridSize: number = 18;
    this._speed = 100;
    this._field = new Field(width, height, gridSize);
    this._fieldRenderer = new FieldRenderer(this._field, fieldId);
    this._fieldController = new FieldController(this._field);
  }

  public initialize(): void {
    this._fieldRenderer.renderField();
    this.startTimer();
  }

  public startTimer(): void {
    this.timer = setInterval(this._addOrMovePiece.bind(this), this._speed);
  }

  public stopTimer(): void {
    clearInterval(this.timer);
  }

  public render(): void {
    this._fieldRenderer.render();
  }

  private _addOrMovePiece(): void {
    let success = false;
    if (!this._fieldController.hasCurrentPiece) {
      success = this._fieldController.addPiece();
    } else {
      this._fieldController.attemptToMovePiece(Direction.Down);
      success = true;
    }
    this.render();
    if (!success) {
      window.dispatchEvent(new Event('lose'));
    }
  }
  

  
  /* render(fieldId: string) {
    let fieldDom = document.getElementById(fieldId);

    if (!(fieldDom instanceof HTMLCanvasElement)) {
      throw new Error(`The element of id "${canvasId}" is not a HTMLCanvasElement. Make sure a <canvas id="${canvasId}""> element is present in the document.`);
    }
    for (let attr of ['width', 'height']) {
      fieldDom.setAttribute(attr, this.size[attr].toString());
    }
    let fieldContext = fieldDom.getContext('2d');
    fieldContext.fillStyle = this.backgroundColor;
    fieldContext.fillRect(0, 0, this.size.width, this.size.height);
  } */
}
