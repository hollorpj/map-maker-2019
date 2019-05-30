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

  private opening : boolean = false;
  private closing : boolean = false;
  private hidden : boolean = true;
  private displayingModal : boolean = false;

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
    this.opening = true;
    this.closing = false;
    this.hidden = false;
    this.displayingModal = true;
    setTimeout(() => this.opening = false, 25);
  }

  /**
   * Simple closes the modal
   */
  public closeModal() {
    this.displayingModal = false;
    this.closing = true;
    this.modalClosed.emit();

    setTimeout(() => {
      this.hidden = true;
    }, 1000);

  }


}
