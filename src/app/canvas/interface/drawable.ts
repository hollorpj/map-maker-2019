export interface Drawable {

  draw();
  changeContext(ctx);
  scaleToSize(width : number, height : number);
  setPosition(x : number, y : number);
  getX() : number;
  getY() : number;
  clone();

}
