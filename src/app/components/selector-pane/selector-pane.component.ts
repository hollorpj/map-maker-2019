import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'selector-pane',
  templateUrl: './selector-pane.component.html',
  styleUrls: ['./selector-pane.component.css']
})
export class SelectorPaneComponent  {

  @ViewChild('spriteUploader')
  private spriteUploader;

  private temp;

  constructor() { }

  private openSpriteUploader() {
    let event = new MouseEvent('click', {bubbles: false});
    this.spriteUploader.nativeElement.dispatchEvent(event);
  }

  public importSpritesheet(spritesheetFile) {
    let file = spritesheetFile.target.files[0];

    var fileReader = new FileReader();
    var that = this;
    fileReader.onload = function(e) {
       that.temp = fileReader.result;
    }
    fileReader.readAsDataURL(file);
  }
}
