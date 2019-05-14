import {Drawable} from "src/app/canvas/interface/drawable";
import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";
import {Boundary} from "src/app/canvas/interface/boundary";

export class CustomButton implements Drawable {

  private artist : Drawable;
  private mouseEventConsumer : MouseEventConsumer;

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

  /**
   * API Methods
   */

  public attachMouseEventConsumer(mouseEventConsumer : MouseEventConsumer) {
    this.mouseEventConsumer = mouseEventConsumer;
  }

}
