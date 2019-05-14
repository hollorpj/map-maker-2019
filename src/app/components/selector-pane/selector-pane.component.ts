import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Drawable} from "src/app/canvas/interface/drawable";
import {SubImage} from "src/app/canvas/image/sub-image";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {Point} from "src/app/model/point";
import {TileButtonCanvasManager} from "src/app/components/selector-pane/canvas/tile-button-canvas-manager";
import {RectangularBoundary} from "src/app/canvas/boundary/rectangular-boundary";

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

  /** Styling **/

  private tileSelectorHeight;
  private tileSelectorWidth;
  private tileSelectorPadding;

  private tileButtonWidth = 32;
  private tileButtonHeight = 32;

  private tileMarginX = 10;
  private tileMarginY = 10;

  /** Canvas Elements **/

  private ctx;
  private tileButtons : Drawable[] = [];

  private tileButtonCanvasManager : TileButtonCanvasManager;

  constructor() {
    this.tileSelectorHeight = 2000;
    this.tileSelectorWidth = window.innerWidth * .3 * .8;
    this.tileSelectorPadding = window.innerWidth * .3 * .1 + 'px';
  }

  ngOnInit() {
    this.ctx = this.tileSelectorCanvas.nativeElement.getContext("2d");
    this.tileButtonCanvasManager = new TileButtonCanvasManager(this.tileSelectorCanvas.nativeElement);
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
         self.initializeTileSelection(spritesheet);
       }
    }
    fileReader.readAsDataURL(file);
  }

  private initializeTileSelection(spritesheetImg) {
    const spritesheetWidth = spritesheetImg.width;
    const spritesheetHeight = spritesheetImg.height;

    let numTilesWide = spritesheetWidth / this.tileWidth;
    let numTilesTall = spritesheetHeight / this.tileHeight;

    for (let i = 0; i < numTilesTall; i++) {
      for (let j = 0; j < numTilesWide; j++) {
        let imgX = this.tileWidth * j;
        let imgY = this.tileHeight * i;
        const canvasPos = this.positionTileInCanvas(j + (numTilesWide * i));

        const img = new SubImage(spritesheetImg, this.ctx, canvasPos.x, canvasPos.y, imgX, imgY, this.tileButtonWidth, this.tileButtonHeight, this.tileWidth, this.tileHeight);
        const imgButton = new CustomButton(img);
        const topLeftPoint = new Point(canvasPos.x, canvasPos.y);
        const bottomRightPoint = new Point(canvasPos.x + this.tileButtonWidth, canvasPos.y + this.tileButtonHeight);
        const boundary = new RectangularBoundary(topLeftPoint, bottomRightPoint);
        this.tileButtonCanvasManager.addTileButton(imgButton, boundary);
      }
    }

    this.tileButtonCanvasManager.draw();
  }

  private positionTileInCanvas(tileNumber) : Point {
    let numTilesPerRow = Math.floor(this.tileSelectorWidth / (this.tileButtonWidth + this.tileMarginX));

    let rowNum = Math.floor(tileNumber / numTilesPerRow);
    let colNum = tileNumber - (numTilesPerRow * rowNum);

    let posX = colNum * this.tileButtonWidth + (this.tileMarginX * colNum);
    let posY = rowNum * this.tileButtonHeight + (this.tileMarginY * rowNum);

    return new Point(posX, posY);
  }

}
