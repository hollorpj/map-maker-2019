import {Drawable} from "src/app/canvas/interface/drawable";

export class GridElement implements Drawable {

  private artist : Drawable;

  private gridX : number;
  private gridY : number;

  constructor(artist : Drawable, gridX : number, gridY : number) {
    this.artist = artist;
    this.gridX = gridX;
    this.gridY = gridY;
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

  public getX() {
    return this.artist.getX();
  }

  public getY() {
    return this.artist.getY();
  }

  public clone() {
    return this.artist.clone();
  }

  /**
   * Implementation-Specific Methods
   */

  public getGridX() : number {
    return this.gridX;
  }

  public getGridY() : number {
    return this.gridY;
  }

  /**
   * Returns a copy of this element
   */
  public copy() : GridElement {
    const clone = new GridElement(this.artist, this.gridX, this.gridY);
    return clone;
  }

  public setArtist(artist : Drawable) {
    this.artist = artist;
  }

}
