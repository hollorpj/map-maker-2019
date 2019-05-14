import {Drawable} from "src/app/canvas/interface/drawable";
import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";

export class CanvasButton {


  private ctx;
  private artist : Drawable;
  private mouseListener : MouseEventConsumer;

  /** Spatial Parameters **/

  private x : number;
  private y : number;

  private width : number;
  private height : number;

  /** Configurable **/

  private backgroundColor : string;
  private text : string;

  private fontSize = 16;
  private fontStyle = 'Arial';
  private fontColor = 'black';

  constructor(ctx, artist : Drawable, mouseListener : MouseEventConsumer) {
    this.ctx = ctx;
    this.artist = artist;
    this.mouseListener = mouseListener;
  }

  public draw() {
    this.ctx.save();

    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.font = this.fontSize + 'px ' + this.fontStyle;
    this.ctx.fontColor = this.fontColor;

    const textWidth = this.ctx.measureText(this.text).width;
    const textX = this.x + this.width / 2 - textWidth / 2;
    const textY = this.y + this.height / 2 + this.fontSize / 2;

    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.fontColor;
    this.ctx.fillText(this.text, textX, textY);

    this.ctx.restore();
  }

  public consumeMouseDown(mouseEvent) {
    this.mouseListener.consumeMouseDown(mouseEvent);
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public setBackgroundColor(backgroundColor : string) {
    this.backgroundColor = backgroundColor;
  }

  public setWidth(width : number) {
    this.width = width;
  }

  public setHeight(height : number) {
    this.height = height;
  }

  public setText(text : string) {
    this.text = text;
  }

  public setFontSize(fontSize : number) {
    this.fontSize = fontSize;
  }

  public setFontStyle(fontStyle : string) {
    this.fontStyle = fontStyle;
  }

  public setFontColor(fontColor : string) {
    this.fontColor = fontColor;
  }

}
