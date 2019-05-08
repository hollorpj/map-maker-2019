import {Drawable} from "./interface/drawable";

export class SubImage implements Drawable {

  private image : Image;
  private canvasX : number;
  private canvasY : number;
  private imgX : number;
  private imgY : number;
  private width : number;
  private height : number;

  private ctx;

  constructor(image : Image, ctx, canvasX : number, canvasY : number, imgX : number, imgY : number, width : number, height : number) {
    this.image = image;
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    this.imgX = imgX;
    this.imgY = imgY;
    this.width = width;
    this.height = height;

    this.ctx = ctx;
  }

  public draw() {
    this.ctx.save();

    this.ctx.drawImage(this.image, this.imgX, this.imgY, this.width, this.height, this.canvasX, this.canvasY, this.width, this.height);

    this.ctx.restore();
  }

}
