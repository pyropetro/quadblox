/* interface Size {
  [index: string]: number;
  width: number;
  height: number;
} */

import Field from "./Field";
import FieldController from "./FieldController";
import FieldRenderer from './FieldRenderer'

export default class FieldMaster {
  field: Field;
  private _fieldRenderer: FieldRenderer;
  fieldController: FieldController;

  constructor(
    width: number, 
    height: number, 
    gridSize: number,
    fieldId: string
  ) {
    let field = new Field(width, height, gridSize);
    this.field = field;
    this._fieldRenderer = new FieldRenderer(field, fieldId);
    this.fieldController = new FieldController(field);
  }

  public render(): void {
    this._fieldRenderer.renderField();
    this._fieldRenderer.render();
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
