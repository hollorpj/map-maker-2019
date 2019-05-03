import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'selector-pane',
  templateUrl: './selector-pane.component.html',
  styleUrls: ['./selector-pane.component.css']
})
export class SelectorPaneComponent {

  /** View Children **/

  @ViewChild('tileSelectorCanvas')
  private tileSelectorCanvas;

  @ViewChild('spriteUploader')
  private spriteUploader;

  /** State **/

  private spriteSheetImgData;

  private tileWidth;
  private tileHeight;
  private space;

  /** Styling **/

  private tileSelectorHeight;
  private tileSelectorWidth;
  private tileSelectorPadding;

  constructor() {
    this.tileSelectorHeight = window.innerHeight * .8;
    this.tileSelectorWidth = window.innerWidth * .3 * .8;
    this.tileSelectorPadding = window.innerWidth * .3 * .1 + 'px';
  }

  private openSpriteUploader() {
    let event = new MouseEvent('click', {bubbles: false});
    this.spriteUploader.nativeElement.dispatchEvent(event);

  }

  public importSpritesheet(spritesheetFile) {
    let file = spritesheetFile.target.files[0];

    var fileReader = new FileReader();
    var that = this;
    fileReader.onload = function(e) {
       that.spriteSheetImgData = fileReader.result as string;
       let img = new Image();
       img.src = that.spriteSheetImgData;
       img.onload = function() {
         that.tileSelectorCanvas.nativeElement.getContext("2d").drawImage(img, 0, 0, 1000, 1000);
       }
    }
    fileReader.readAsDataURL(file);
  }
}
