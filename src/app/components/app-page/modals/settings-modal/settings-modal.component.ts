import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {SettingsStateService} from "src/app/service/settings-state-service.service";

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent  {

  /** View Children **/

  @ViewChildren('tilesWideOption')
  private tilesWideOptionElRefs : QueryList<ElementRef>;

  @ViewChildren('tilesTallOption')
  private tilesTallOptionElRefs : QueryList<ElementRef>;

  @ViewChildren('pixelsWideOption')
  private pixelsWideOptionElRefs : QueryList<ElementRef>;

  @ViewChildren('pixelsTallOption')
  private pixelsTallOptionElRefs : QueryList<ElementRef>;

  /** Output **/

  @Output()
  private modalClosed : EventEmitter<void> = new EventEmitter<void>();

  /** Constants **/

  private selectorOptions : string[] = new Array(1024);

  /** State **/

  private opening : boolean = false;
  private closing : boolean = false;
  private hidden : boolean = true;
  private displayingModal : boolean = false;

  constructor(private settingsStateService : SettingsStateService) { }

  /**
   * Gross javascript hack since Angular doesn't have key listeners
   * @param event
   */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeModal();
  }

  /**
   * Exposed Methods
   */

  public openModal() {
    this.opening = true;
    this.closing = false;
    this.hidden = false;
    this.displayingModal = true;
    setTimeout(() => this.opening = false, 25);
  }

  public closeModal() {
    this.displayingModal = false;
    this.closing = true;
    this.modalClosed.emit();

    setTimeout(() => {
      this.hidden = true;
    }, 1000);

  }

  /**
   * Private Methods
   */

  private applySettings() {
    const newBoardWidth = this.getSelectedDropdownOption(this.tilesWideOptionElRefs.toArray());
    const newBoardHeight = this.getSelectedDropdownOption(this.tilesTallOptionElRefs.toArray());

    this.settingsStateService.setWorkspaceDimensions(newBoardWidth, newBoardHeight);
    this.closeModal();
  }

  private getSelectedDropdownOption(optionRefs : ElementRef[]) {
    for (let optionRef of optionRefs) {
      if (optionRef.nativeElement.selected) {
        return optionRef.nativeElement.value;
      }
    }
  }


}
