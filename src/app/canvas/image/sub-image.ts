import {Drawable} from "../interface/drawable";

export class SubImage implements Drawable {

  private image : any;
  private canvasX : number;
  private canvasY : number;
  private imgX : number;
  private imgY : number;
  private canvasWidth : number;
  private canvasHeight : number;
  private imgWidth : number;
  private imgHeight : number

  private ctx;

  constructor(image : any, ctx, canvasX : number, canvasY : number, imgX : number, imgY : number, canvasWidth : number, canvasHeight : number, imgWidth : number, imgHeight : number) {
    this.image = image;
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    this.imgX = imgX;
    this.imgY = imgY;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;

    this.ctx = ctx;
  }

  public draw() {
    this.ctx.save();

    this.ctx.drawImage(this.image, this.imgX, this.imgY, this.imgWidth, this.imgHeight, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);

    this.ctx.restore();
  }

  public setPosition(x: number, y: number) {
    this.canvasX = x;
    this.canvasY = y;
  }

  public scaleToSize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  public changeContext(ctx) {
    this.ctx = ctx;
  }

  public getX(): number {
    return this.canvasX;
  }

  public getY(): number {
    return this.canvasY;
  }

}
