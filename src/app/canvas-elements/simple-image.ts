import {Drawable} from "./interface/drawable";

export class SimpleImage implements Drawable  {

  private image : Image;
  private posX : number;
  private posY : number;

  private ctx;

  constructor(image : Image, ctx, posX : number, posY : number) {
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
}
