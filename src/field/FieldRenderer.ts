import Field from './Field'
import IRenderable from '../IRenderable'
import IIndexable from '../IIndexable';

export default class FieldRenderer implements IRenderable{
  private readonly _field: Field;
  private readonly _fieldId: string;
  private readonly _fieldDom: HTMLCanvasElement;
  private _fieldContext: CanvasRenderingContext2D;
  private readonly _colors: IIndexable = {
    i: 'cyan'
  }
  
  constructor(field: Field, fieldId: string) {
    this._field = field;
    let fieldDom = document.getElementById(fieldId);

    if (!(fieldDom instanceof HTMLCanvasElement)) {
      throw new Error(`The element of id "${fieldId}" is not a HTMLCanvasElement. Make sure a <canvas id="${fieldId}""> element is present in the document.`);
    }

    this._fieldDom = fieldDom;
    this._fieldContext = this._fieldDom.getContext('2d');
  }

  public renderField(): void {
    
    this._fieldDom.setAttribute('width', this._findGridUnitPixelSize(this._field.width));
    this._fieldDom.setAttribute('height', this._findGridUnitPixelSize(this._field.height));

    /* fieldContext.fillStyle = this.backgroundColor;
    fieldContext.fillRect(0, 0, this.size.width, this.size.height); */

    /* fieldDom.style.width = this._findGridUnitPixelSize(this._field.width);
    fieldDom.style.height = this._findGridUnitPixelSize(this._field.height); */
  }

  public render(): void {
    for (let h=0; h<this._field.height; h++) {
      for (let w=0; w<this._field.width; w++) {
        const size = this._field.gridSize;
        const x = w * size;
        const y = h * size;
        const width = size;
        const height = size;
        this._fieldContext.clearRect(x, y, width, height);
        const currentSymbol = this._field.contentsAtCoordinates(w, h).toLowerCase();
        if (currentSymbol) {
          const color: string = this._colors[currentSymbol];
          this._fieldContext.fillStyle = color;
          this._fieldContext.strokeStyle = 'black';
          this._fieldContext.fillRect(x, y, width, height);
          this._fieldContext.strokeRect(x, y, width, height);
        }
      }
    }
  }

  private _findGridUnitPixelSize(size: number): string {
    let rawSize: number = size * this._field.gridSize;
    return rawSize.toString() + 'px';
  }
}