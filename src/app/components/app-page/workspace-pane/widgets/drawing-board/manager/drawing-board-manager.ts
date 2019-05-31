import {GridElement} from "src/app/canvas/buttons/grid-element";
import {RectangularBoundary} from "src/app/canvas/boundary/rectangular-boundary";
import {MouseEventCoordinator} from "src/app/canvas/engine/mouse-event-coordinator";
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";
import {MouseEventConsumerImpl} from "src/app/canvas/buttons/button-listener";

export class DrawingBoardManager {

  private appCommSvc : InterComponentCommunicationService;

  private drawingBoardTiles : GridElement[] = [];
  private mouseEventCoordinator : MouseEventCoordinator;

  private ctx;

  constructor(appCommSvc : InterComponentCommunicationService, canvasElement ) {
    this.appCommSvc = appCommSvc;
    this.mouseEventCoordinator = new MouseEventCoordinator(canvasElement);
    this.ctx = canvasElement.getContext("2d");
  }

  /**
   * API Methods
   */

  public addDrawingBoardTile(tile : GridElement, boundary : RectangularBoundary) {
    this.drawingBoardTiles.push(tile);

    this.registerClickListener(tile, boundary);
  }

  public drawTiles() {
    this.drawingBoardTiles.forEach(drawingBoardTile => drawingBoardTile.draw());
  }

  public clearTiles() {
    this.drawingBoardTiles = [];
  }

  /**
   * Internal Methods
   */

  private mousePressed : boolean = false;

  private registerClickListener(tile : GridElement, boundary : RectangularBoundary) {
    const mouseConsumer = new MouseEventConsumerImpl();
    mouseConsumer.setMouseDownCallback(this.mouseDownCallback.bind(this, tile));
    mouseConsumer.setMouseUpCallback(this.mouseUpCallback.bind(this));
    mouseConsumer.setMouseMoveCallback(this.mouseMoveCallback.bind(this, tile));
    mouseConsumer.setMouseLeaveCallback(this.mouseLeaveCallback.bind(this));
    mouseConsumer.setBoundary(boundary);

    this.mouseEventCoordinator.addConsumer(mouseConsumer);
  }

  private mouseDownCallback(tile : GridElement) {
    this.mousePressed = true;
    this.paintTile(tile);
  }

  private mouseUpCallback() {
    this.mousePressed = false;
  }

  private mouseLeaveCallback() {
    this.mousePressed = false;
  }

  private mouseMoveCallback(tile : GridElement) {
    if (this.mousePressed) {
      this.paintTile(tile);
    }
  }

  private paintTile(tile : GridElement) {
    const currentlySelectedTile = this.appCommSvc.getCurrentlySelectedTile().clone();

    const x = tile.getX();
    const y = tile.getY();

    tile.setArtist(currentlySelectedTile);
    tile.changeContext(this.ctx);
    currentlySelectedTile.scaleToSize(32, 32);
    currentlySelectedTile.setPosition(x, y);
    this.drawTiles();
  }

}
