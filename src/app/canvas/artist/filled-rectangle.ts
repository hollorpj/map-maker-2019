import {Drawable} from "src/app/canvas/interface/drawable";

export class FilledRectangle implements Drawable {

  private ctx;

  private x : number;
  private y : number;

  private width : number;
  private height : number;
  private lineWidth : number = 1;

  private fillColor : string = 'rgb(0, 0, 0)';
  private borderColor : string = 'rgb(255, 255, 255)';

  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * API Methods
   */

  changeContext(ctx) {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);

    this.ctx.restore();
  }

  scaleToSize(width: number, height: number) {
    throw Error('not implemented');
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  clone() {
    return new FilledRectangle(this.ctx, this.x, this.y, this.width, this.height);
  }

  /**
   * Mutator Methods
   */

  public setWidth(width : number) {
    this.width = width;
    return this;
  }

  public setHeight(height : number) {
    this.height = height;
    return this;
  }

  public setLineWidth(lineWidth : number) {
    this.lineWidth = lineWidth;
    return this;
  }

  public setFillColor(fillColor : string) {
    this.fillColor = fillColor;
    return this;
  }

  public setBorderColor(borderColor : string) {
    this.borderColor = borderColor;
    return this;
  }


}
