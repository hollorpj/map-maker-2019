import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";
import {Boundary} from "src/app/canvas/interface/boundary";
import {Point} from "src/app/model/point";

export class MouseEventConsumerImpl implements MouseEventConsumer {

  private boundary : Boundary;

  private mouseDownCallback;
  private mouseUpCallback;
  private mouseEnterCallback;
  private mouseMoveCallback;
  private mouseLeaveCallback;

  constructor() {
  }

  consumeMouseDown(event) {
    this.mouseDownCallback(event);
  }

  consumeMouseUp(event) {
    this.mouseUpCallback(event);
  }

  consumeMouseEnter(event) {
    this.mouseEnterCallback(event);
  }

  consumeMouseLeave(event) {
    this.mouseLeaveCallback(event);
  }

  consumeMouseMove(event) {
    this.mouseMoveCallback(event);
  }

  setBoundary(boundary: Boundary) {
    this.boundary = boundary;
  }

  isClickWithinBoundary(clickX: number, clickY: number) : boolean {
    console.log(clickX + "::" + clickY);
    return this.boundary.isPointInBoundary(new Point(clickX, clickY));
  }

  setMouseDownCallback(callback) {
    this.mouseDownCallback = callback;
  }

  setMouseEnterCallback(callback) {
    this.mouseEnterCallback = callback;
  }

  setMouseLeaveCallback(callback) {
    this.mouseLeaveCallback = callback;
  }

  setMouseUpCallback(callback) {
    this.mouseUpCallback = callback;
  }

  setMouseMoveCallback(callback) {
    this.mouseMoveCallback = callback;
  }



}
