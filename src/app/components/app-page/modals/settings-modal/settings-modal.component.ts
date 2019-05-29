import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent  {


  /** Output **/

  @Output()
  private modalClosed : EventEmitter<void> = new EventEmitter<void>();

  /** State **/

  private open : boolean = false;
  private hidden : boolean = true;

  constructor() { }

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

  /**
   * Simply opens the modal
   */
  public openModal() {
    this.open = true;
    this.hidden = false;
  }

  /**
   * Simple closes the modal
   */
  public closeModal() {
    this.open = false;
    this.modalClosed.emit();

    setTimeout(() => {
      this.hidden = true;
    }, 1000);

  }


}
