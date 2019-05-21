import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FilledRectangle} from "src/app/canvas/artist/filled-rectangle";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {DrawingBoardManager} from "src/app/components/app-page/workspace-pane/widgets/drawing-board/manager/drawing-board-manager";
import {GridElement} from "src/app/canvas/buttons/grid-element";
import {RectangularBoundary} from "src/app/canvas/boundary/rectangular-boundary";
import {Point} from "src/app/model/point";
import {InterComponentCommService} from "src/app/components/app-page/inter-component-comm.service";

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

  private drawingBoardWidth : number = window.innerWidth * .58 - 20;
  private drawingBoardHeight : number = window.innerHeight * .8;

  private tileWidth : number = 32;
  private tileHeight : number = 32;

  private emptyBorderColor : string = '#218b01';
  private emptyFillColor : string = '#000000';

  /** Canvas Management **/

  private drawingBoardManager : DrawingBoardManager;

  /** Initialization **/

  constructor(private appCommSvc : InterComponentCommService) { }

  ngAfterViewInit() {
    this.canvasCtx = this.drawingBoardElRef.nativeElement.getContext("2d");
    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, this.drawingBoardWidth, this.drawingBoardHeight);
    this.drawingBoardManager = new DrawingBoardManager(this.appCommSvc, this.drawingBoardElRef.nativeElement);

    this.initializeFreshBoard();
  }

  private initializeFreshBoard() {
    const numTilesTall = this.drawingBoardHeight / this.tileHeight;
    const numTilesWide = this.drawingBoardWidth / this.tileWidth;

    for (let i = 0; i < numTilesTall; i++) {
      for (let j = 0; j < numTilesWide; j++) {
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
