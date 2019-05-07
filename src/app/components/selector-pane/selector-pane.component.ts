import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TileData} from "../../model/tile-data";

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

  private tileWidth;
  private tileHeight;

  /** Screen Elements **/

  private tileData : TileData[] = [];

  /** Styling **/

  private tileSelectorHeight;
  private tileSelectorWidth;
  private tileSelectorPadding;

  constructor() {
    this.tileSelectorHeight = window.innerHeight * .8;
    this.tileSelectorWidth = window.innerWidth * .3 * .8;
    this.tileSelectorPadding = window.innerWidth * .3 * .1 + 'px';
  }

  ngOnInit() {
  }


  private openSpriteUploader() {
    let event = new MouseEvent('click', {bubbles: false});
    this.spriteUploader.nativeElement.dispatchEvent(event);

  }

  public importSpritesheet(spritesheetFile) {
    let file = spritesheetFile.target.files[0];

    let fileReader = new FileReader();
    let self = this;
    fileReader.onload = function(e) {
       let spriteSheetImgData = fileReader.result as string;
       let spritesheet = new Image();
       spritesheet.src = spriteSheetImgData;
       spritesheet.onload = function() {
         self.tileData.push(new TileData(spriteSheetImgData, 'rect(0px 75px 75px 0px'));
       }
    }
    fileReader.readAsDataURL(file);
  }

}
