import Field from './Field'
import IRenderable from '../interfaces/IRenderable'
import IIndexable from '../interfaces/IIndexable';
import IColor from '../interfaces/IColor';
import IColors from '../interfaces/IColors';
import Point from '../Point';

export default class FieldRenderer implements IRenderable{
  private readonly _field: Field;
  private readonly _fieldId: string;
  private readonly _fieldDom: HTMLCanvasElement;
  private _fieldContext: CanvasRenderingContext2D;
  private readonly _colors: IColors = {
    i: {
      /* sky blue */
      r: 91,
      g: 228,
      b: 255
    },
    o: {
      /* yellow */
      r: 240,
      g: 255,
      b: 87
    },
    t: {
      /* purple */
      r: 205,
      g: 0,
      b: 155
    },
    s: {
      /* green */
      r: 62,
      g: 193,
      b: 106
    },
    z: {
      /* red */
      r: 213,
      g: 40,
      b: 40
    },
    l: {
      /* orange */
      r: 255,
      g: 148,
      b: 0
    },
    j: {
      /* blue */
      r: 0,
      g: 64,
      b: 226
    },

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
        this._fieldContext.clearRect(x, y, size, size);
        const currentSymbol = this._field.getContentsAtCoordinates(w, h).toLowerCase();
        if (currentSymbol) {
          this._renderBlock(x, y, size, currentSymbol);
        }
      }
    }
  }

  private _findGridUnitPixelSize(size: number): string {
    let rawSize: number = size * this._field.gridSize;
    return rawSize.toString() + 'px';
  }

  private _renderBlock(x: number, y: number, size: number, currentSymbol: string): void {
    const color: IColor = this._colors[currentSymbol];
    const borderWidth: number = 3;

    /* Fill main square */
    this._fieldContext.fillStyle = this._getColorString(color.r, color.g, color.b);
    this._fieldContext.fillRect(x, y, size, size);

    /* Create bevel border */
    const outerTopLeft = new Point(x, y);
    const outerTopRight = new Point(x + size, y);
    const outerBottomRight = new Point(x + size, y + size);
    const outerBottomLeft = new Point(x, y + size);

    const innerTopLeft = new Point(
      outerTopLeft.x + borderWidth,
      outerTopLeft.y + borderWidth
    );
    const innerTopRight = new Point(
      outerTopRight.x - borderWidth,
      outerTopRight.y + borderWidth
    );
    const innerBottomRight = new Point(
      outerBottomRight.x - borderWidth,
      outerBottomRight.y - borderWidth
    );
    const innerBottomLeft = new Point(
      outerBottomLeft.x + borderWidth,
      outerBottomLeft.y - borderWidth
    );

    /* top */
    const topColor = this._getColorString(color.r + 40, color.g + 40, color.b + 40);
    this._renderBorderSide(topColor, outerTopLeft, outerTopRight, innerTopRight, innerTopLeft);

    /* right */
    const rightColor = this._getColorString(color.r - 40, color.g - 40, color.b - 40);
    this._renderBorderSide(rightColor, outerTopRight, outerBottomRight, innerBottomRight, innerTopRight);

    /* bottom */
    const bottomColor = this._getColorString(color.r - 90, color.g - 90, color.b - 90);
    this._renderBorderSide(bottomColor, outerBottomRight, outerBottomLeft, innerBottomLeft, innerBottomRight);

    /* left */
    const leftColor = this._getColorString(color.r + 17, color.g + 17, color.b + 17);
    this._renderBorderSide(leftColor, outerBottomLeft, outerTopLeft, innerTopLeft, innerBottomLeft);

  }

  private _renderBorderSide(
    colorAdjusted: string,
    outerPoint1: Point,
    outerPoint2: Point,
    innerPoint1: Point,
    innerPoint2: Point,
  ): void {
    this._fieldContext.beginPath();
    this._fieldContext.moveTo(outerPoint1.x, outerPoint1.y);
    this._fieldContext.lineTo(outerPoint2.x, outerPoint2.y);
    this._fieldContext.lineTo(innerPoint1.x, innerPoint1.y);
    this._fieldContext.lineTo(innerPoint2.x, innerPoint2.y);
    this._fieldContext.closePath();
    this._fieldContext.fillStyle = colorAdjusted;
    this._fieldContext.fill();
  }

  private _getColorString(r: number, g: number, b: number, a?: number) {
    const colorMin = 0;
    const colorMax = 255;
    const alphaMin = 0;
    const alphaMax = 1;
    let newR: number = this._adjustRange(r, colorMin, colorMax);
    let newG: number = this._adjustRange(g, colorMin, colorMax);
    let newB: number = this._adjustRange(b, colorMin, colorMax);
    let newA: number|null = a ? this._adjustRange(a, alphaMin, alphaMax) : null;
    return `rgb${newA ?? ''}(${newR}, ${newG}, ${newB}${newA ? `, ${newA}` : ''})`;
  }

  private _adjustRange(colorComponent:number, min: number, max: number): number {
    if (colorComponent < min) {
      return min;
    } else if (colorComponent > max) {
      return max;
    } else {
      return colorComponent;
    }
  }
}