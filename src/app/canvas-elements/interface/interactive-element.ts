export interface InteractiveElement {

  draw();
  consumeMouseDown(mouseEvent);
  consumeMouseUp(mouseEvent);
  setPosition(x : number, y : number);

}
