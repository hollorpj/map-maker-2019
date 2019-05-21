import {Drawable} from "src/app/canvas/interface/drawable";
import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";
import {Boundary} from "src/app/canvas/interface/boundary";

export class CustomButton implements Drawable {

  private artist : Drawable;

  constructor(artist : Drawable) {
    this.artist = artist;
  }

  /**
   * Drawable Forwarding Methods
   */

  public draw() {
    this.artist.draw();
  }

  public setPosition(x: number, y: number) {
    this.artist.setPosition(x, y);
  }

  public changeContext(ctx) {
    this.artist.changeContext(ctx);
  }

  public scaleToSize(width: number, height: number) {
    this.artist.scaleToSize(width, height);
  }

  public getX(): number {
    return this.artist.getX();
  }

  public getY(): number {
    return this.artist.getY();
  }

  /**
   * Returns a copy of this button
   */
  public copy() : CustomButton {
    const clone = new CustomButton(this.artist);
    return clone;
  }

  public getArtist() : Drawable {
    return this.artist;
  }


}
