import {MouseEventCoordinator} from "src/app/canvas/engine/mouse-event-coordinator";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {Boundary} from "src/app/canvas/interface/boundary";
import {MouseEventConsumerImpl} from "src/app/canvas/buttons/button-listener";

export class TileButtonCanvasManager {

  private tileButtons : CustomButton[] = [];
  private mouseEventCoordinator : MouseEventCoordinator;

  constructor(canvasElement) {
    this.mouseEventCoordinator = new MouseEventCoordinator(canvasElement);
  }

  /**
   * API Methods
   */

  /**
   * Adds a tile button to the crew.
   * Creates a mouse listeners and handles it's rendering and side-effects
   */
  public addTileButton(tileButton : CustomButton, boundary : Boundary) {
    this.tileButtons.push(tileButton);

    const mouseConsumer = this.generateMouseConsumer(tileButton, boundary);
    this.mouseEventCoordinator.addConsumer(mouseConsumer);
  }

  /**
   * Causes the draw method associated with the tileButtons to be called
   */
  public draw() {
    for (let i = 0; i < this.tileButtons.length; i++) {
      this.tileButtons[i].draw();
    }
  }

  /**
   * Implementation Methods
   */

  private generateMouseConsumer(tileButton : CustomButton, boundary : Boundary) {
    const mouseConsumer = new MouseEventConsumerImpl();
    mouseConsumer.setMouseDownCallback(this.mouseDownTest);
    mouseConsumer.setBoundary(boundary);

    return mouseConsumer;
  }

  private mouseDownTest() {
    alert('worked');
  }




}
