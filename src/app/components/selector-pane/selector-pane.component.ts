import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {SimpleImage} from "../../canvas-elements/simple-image";
import {SubImage} from "../../canvas-elements/sub-image";
import {Drawable} from "../../canvas-elements/interface/drawable";

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

  private numTileColumns;
  private numTileRows;

  /** Canvas Elements **/

  private ctx;
  private tileButtons : Drawable[] = [];

  constructor() {
    this.tileSelectorHeight = 2000;
    this.tileSelectorWidth = window.innerWidth * .3 * .8;
    this.tileSelectorPadding = window.innerWidth * .3 * .1 + 'px';
  }

  ngOnInit() {
    this.ctx = this.tileSelectorCanvas.nativeElement.getContext("2d");
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
         self.initializeTileSelection(spritesheet, spriteSheetImgData);
       }
    }
    fileReader.readAsDataURL(file);
  }

  private initializeTileSelection(spritesheetImg, spriteSheetImgData) {
    const spritesheetWidth = spritesheetImg.width;
    const spritesheetHeight = spritesheetImg.height;

    let numTilesWide = spritesheetWidth / this.tileWidth;
    let numTilesTall = spritesheetHeight / this.tileHeight;

    for (let k = 0; k < 1000; k++) {
      for (let i = 0; i < numTilesTall; i++) {
        for (let j = 0; j < numTilesWide; j++) {
          let top = this.tileHeight * i;
          let right = this.tileWidth * (j + 1);
          let bottom = this.tileHeight * (i + 1);
          let left = this.tileWidth * j;

          let canvasX = Math.random() * this.tileSelectorWidth;
          let canvasY = Math.random() * this.tileSelectorHeight;

          const img = new SubImage(spritesheetImg, this.ctx, canvasX, canvasY, left, top, this.tileWidth, this.tileHeight);

          this.tileButtons.push(img);
        }
      }
    }


    for (let i = 0; i < this.tileButtons.length; i++) {
      setTimeout(() => this.tileButtons[i].draw(), 300);
    }


  }

}
