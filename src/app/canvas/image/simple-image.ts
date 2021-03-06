import {Drawable} from "../interface/drawable";

export class SimpleImage implements Drawable  {

  private image : any;
  private posX : number;
  private posY : number;

  private ctx;

  constructor(image : any, ctx, posX : number, posY : number) {
    this.image = image;
    this.posX = posX;
    this.posY = posY;

    this.ctx = ctx;
  }

  public draw() {
    this.ctx.save();

    this.ctx.drawImage(this.image, this.posX, this.posY);

    this.ctx.restore();
  }

  setPosition(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  changeContext(ctx) {
    this.ctx = ctx;
  }

  scaleToSize(width: number, height: number) {
    throw Error("unsupported operation");
  }

  public getX(): number {
    return this.posX;
  }

  public getY(): number {
    return this.posY;
  }

  public clone() {
    return new SimpleImage(this.image, this.ctx, this.posX, this.posY);
  }
}
