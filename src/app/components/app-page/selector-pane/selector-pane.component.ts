import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {SubImage} from "src/app/canvas/image/sub-image";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {Point} from "src/app/model/point";
import {TileButtonCanvasManager} from "src/app/components/app-page/selector-pane/canvas/tile-button-canvas-manager";
import {RectangularBoundary} from "src/app/canvas/boundary/rectangular-boundary";
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";

@Component({
  selector: 'selector-pane',
  templateUrl: './selector-pane.component.html',
  styleUrls: ['./selector-pane.component.css']
})
export class SelectorPaneComponent implements OnInit {

  /** View Children **/

  @ViewChild('tileSelectorCanvas')
  private tileSelectorCanvas;

  @ViewChild('spriteUploader')
  private spriteUploader;

  /** State **/

  private tileWidth = 32;
  private tileHeight = 32;

  private spritesheetUploaded : boolean = false;

  private numExistingTiles : number = 0;

  /** Styling **/

  private tileSelectorHeight;
  private tileSelectorWidth;
  private tileSelectorMargin;

  private tileButtonWidth = 32;
  private tileButtonHeight = 32;

  private tileMarginX = 10;
  private tileMarginY = 10;

  /** Canvas Elements **/

  private ctx;

  private tileButtonCanvasManager : TileButtonCanvasManager;

  constructor(private appCommSvc : InterComponentCommunicationService) {
  this.tileSelectorHeight = 2000;
    this.tileSelectorWidth = window.innerWidth * .3 * .8;
  }

  ngOnInit() {
    this.ctx = this.tileSelectorCanvas.nativeElement.getContext("2d");
    this.tileButtonCanvasManager = new TileButtonCanvasManager(this.tileSelectorCanvas.nativeElement, this.appCommSvc);
  }


  private openSpriteUploader() {
    let event = new MouseEvent('click', {bubbles: false});
    this.spriteUploader.nativeElement.dispatchEvent(event);
  }

  public importSpritesheet(spritesheetFile) {
    let file = spritesheetFile.target.files[0];

    let fileReader = new FileReader();
    let self = this;
    fileReader.onload = function() {
       let spriteSheetImgData = fileReader.result as string;
       let spritesheet = new Image();
       spritesheet.src = spriteSheetImgData;
       spritesheet.onload = function() {
         self.spritesheetUploaded = true;
         self.addTilesToSelection(spritesheet);
         self.spriteUploader.nativeElement.value = '';
       }
    }
    fileReader.readAsDataURL(file);
  }

  private addTilesToSelection(spritesheetImg) {
    this.tileSelectorMargin = (this.tileSelectorWidth - this.calculateNumberTilesPerRow() * this.tileWidth) / 2 + 'px';


    const selectionPanelGridDimensions = this.determineSelectionPanelGridDimensions(spritesheetImg.width, spritesheetImg.height);
    let numTilesWide = selectionPanelGridDimensions.x;
    let numTilesTall = selectionPanelGridDimensions.y;

    for (let i = 0; i < numTilesTall; i++) {
      for (let j = 0; j < numTilesWide; j++) {
        let imgX = this.tileWidth * j;
        let imgY = this.tileHeight * i;
        const canvasPos = this.positionTileInCanvas(this.numExistingTiles + j + (numTilesWide * i));
        while (this.tileSelectorHeight < (canvasPos.y + this.tileButtonHeight)) {
          this.tileSelectorHeight += this.tileButtonHeight;
        }

        const img = new SubImage(spritesheetImg, this.ctx, canvasPos.x, canvasPos.y, imgX, imgY, this.tileButtonWidth, this.tileButtonHeight, this.tileWidth, this.tileHeight);
        const imgButton = new CustomButton(img);

        const topLeftPoint = new Point(canvasPos.x, canvasPos.y);
        const bottomRightPoint = new Point(canvasPos.x + this.tileButtonWidth, canvasPos.y + this.tileButtonHeight);
        const boundary = new RectangularBoundary(topLeftPoint, bottomRightPoint);

        this.tileButtonCanvasManager.addTileButton(imgButton, boundary);
      }
    }
    this.numExistingTiles += (numTilesWide * numTilesTall);

    // This is a hack - When the canvas is resized, it clears the canvas after this draw method is called. Creating a slight delay mitigates this
    setTimeout(() => this.tileButtonCanvasManager.draw(), 1);
  }

  /*
   * Helpers
   */

  private positionTileInCanvas(tileNumber) : Point {
    let numTilesPerRow = this.calculateNumberTilesPerRow();

    let rowNum = Math.floor(tileNumber / numTilesPerRow);
    let colNum = tileNumber - (numTilesPerRow * rowNum);

    let posX = colNum * this.tileButtonWidth + (this.tileMarginX * colNum);
    let posY = rowNum * this.tileButtonHeight + (this.tileMarginY * rowNum);

    return new Point(posX, posY);
  }

  private calculateNumberTilesPerRow() {
    return Math.floor(this.tileSelectorWidth / (this.tileButtonWidth + this.tileMarginX));
  }

  /**
   * Will calculate the dimensions of the grid using one of the following procedures:
   *   1. Determine the width based on the 'spritesheet total width' divided by the 'individual tile width'
   *      Determine the height based on the 'spritesheet total height' divided by the 'individual tile height'
   *   2. The values described in item 1, from a previously uploaded spritesheet
   */
  private determineSelectionPanelGridDimensions(spritesheetWidth : number, spritesheetHeight : number) : Point {
    let numTilesWide = spritesheetWidth / this.tileWidth;
    let numTilesTall = spritesheetHeight / this.tileHeight;
    return new Point(numTilesWide, numTilesTall);
  }

}
