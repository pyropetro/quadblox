import FieldMaster from './field/FieldMaster'

export default class Game {
  private _score: number;
  private _level: number;
  private _pointsPerLine: number;
  private _pointsPerQuad: number;
  private _pointsToLevelUp: number;
  private _fieldMaster: FieldMaster;
  private _isRunning: boolean;

  constructor(fieldId: string) {
    this._fieldMaster = new FieldMaster(fieldId);
    this._isRunning = false;
  }

  public start() {
    this._score = 0;
    this._level = 1;
    this._pointsPerLine = 10;
    this._pointsPerQuad = 100;
    this._pointsToLevelUp = 1000;
    this._fieldMaster.initialize();
    this._isRunning = true;
    window.addEventListener('keydown', this.determineKeyAction.bind(this));
    window.addEventListener('lose', this.lose.bind(this));
  }

  determineKeyAction(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        this.pause();
        break;
      default:
        break;
    }
  }

  pause(): void {
    if (this._isRunning) {
      this._fieldMaster.stopTimer();
    } else {
      this._fieldMaster.startTimer();
    }
    this._isRunning = !this._isRunning;
  }

  lose() {
    this._fieldMaster.stopTimer();
  }

}