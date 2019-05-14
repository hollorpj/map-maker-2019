import {Boundary} from "src/app/canvas/interface/boundary";
import {Point} from "src/app/model/point";

export class RectangularBoundary implements Boundary {

  private topLeft : Point;
  private bottomRight : Point;

  /**
   * Takes in pixel pairs representing the top-left coordinates of the rectangle and the bottom-right coordinatess
   */
  constructor(topLeft : Point, bottomRight : Point) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  isPointInBoundary(point: Point) {
    return (point.x >= this.topLeft.x && point.x <= this.bottomRight.x &&
            point.y >= this.topLeft.y && point.y <= this.bottomRight.y);
  }

}
