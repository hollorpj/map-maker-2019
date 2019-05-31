import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FilledRectangle} from "src/app/canvas/artist/filled-rectangle";
import {DrawingBoardManager} from "src/app/components/app-page/workspace-pane/widgets/drawing-board/manager/drawing-board-manager";
import {GridElement} from "src/app/canvas/buttons/grid-element";
import {RectangularBoundary} from "src/app/canvas/boundary/rectangular-boundary";
import {Point} from "src/app/model/point";
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";
import {SettingsStateService} from "src/app/service/settings-state-service.service";

@Component({
  selector: 'drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']
})
export class DrawingBoardComponent implements AfterViewInit {

  /** View Children **/

  @ViewChild('drawingBoard')
  private drawingBoardElRef : ElementRef;

  private canvasCtx;

  /** Display Constants **/

  private canvasContainerWidth : string;
  private canvasContainerHeight : string;

  private numTilesTall : number;
  private numTilesWide : number;

  private drawingBoardWidth : number;
  private drawingBoardHeight : number;

  private tileWidth : number = 32;
  private tileHeight : number = 32;

  private emptyBorderColor : string = '#218b01';
  private emptyFillColor : string = '#000000';

  /** Canvas Management **/

  private drawingBoardManager : DrawingBoardManager;

  /** Initialization **/

  constructor(private appCommSvc : InterComponentCommunicationService,
              private settingsStateSvc : SettingsStateService) {
    this.canvasContainerHeight = window.innerHeight * .8 + 'px';
    this.canvasContainerWidth = window.innerWidth * .58 - 20 + 'px';

    this.numTilesTall = this.settingsStateSvc.getWorkspaceTilesTall();
    this.numTilesWide = this.settingsStateSvc.getWorkspaceTilesWide();

    this.calculateBoardDimensions();
    this.initializeListeners();
  }

  /**
   * Calculates the dimensions of the board.
   * These values will be used by initializedFreshBoard when drawing the board
   */
  private calculateBoardDimensions() {
    const tentativeDrawingBoardWidth = window.innerWidth * .58 - 20;
    if (this.numTilesWide * this.tileWidth > tentativeDrawingBoardWidth) {
      this.drawingBoardWidth = this.numTilesWide * this.tileWidth;
    } else {
      this.drawingBoardWidth = tentativeDrawingBoardWidth;
    }

    const tentativeDrawingBoardHeight = window.innerHeight * .8;
    if (this.numTilesTall  * this.tileHeight > tentativeDrawingBoardHeight) {
      this.drawingBoardHeight = this.numTilesTall * this.tileHeight;
    } else {
      this.drawingBoardHeight = tentativeDrawingBoardHeight;
    }
  }

  /**
   * Initializes listeners.
   * Namely, listens for settings changes related to board size
   */
  private initializeListeners() {
    this.settingsStateSvc.getWorkspaceDimensionEmitter().subscribe((newDimensions : number[]) => {
      this.numTilesWide = newDimensions[0];
      this.numTilesTall = newDimensions[1];

      this.canvasCtx.clearRect(0, 0, this.drawingBoardWidth, this.drawingBoardHeight);

      this.calculateBoardDimensions();
      setTimeout(() => {
        this.canvasCtx = this.drawingBoardElRef.nativeElement.getContext("2d");
        this.initializeFreshBoard();
      }, 300);
    });
  }

  ngAfterViewInit() {
    this.canvasCtx = this.drawingBoardElRef.nativeElement.getContext("2d");
    this.drawingBoardManager = new DrawingBoardManager(this.appCommSvc, this.drawingBoardElRef.nativeElement);

    this.initializeFreshBoard();
  }

  private initializeFreshBoard() {
    this.canvasCtx.clearRect(0, 0, this.drawingBoardWidth, this.drawingBoardHeight);
    this.drawingBoardManager.clearTiles();

    for (let i = 0; i < this.numTilesTall; i++) {
      for (let j = 0; j < this.numTilesWide; j++) {
        const x = j * this.tileWidth;
        const y = i * this.tileHeight;

        const filledRectangle = new FilledRectangle(this.canvasCtx, x, y, this.tileWidth, this.tileHeight)
                                   .setBorderColor(this.emptyBorderColor)
                                   .setFillColor(this.emptyFillColor);
        const boardTile = new GridElement(filledRectangle, j, i);
        const topLeftPoint = new Point(x, y);
        const bottomRightPoint = new Point(x + this.tileWidth, y + this.tileHeight);
        const boardTileBoundary = new RectangularBoundary(topLeftPoint, bottomRightPoint);

        this.drawingBoardManager.addDrawingBoardTile(boardTile, boardTileBoundary);
      }
    }

    this.drawingBoardManager.drawTiles();
  }

}
