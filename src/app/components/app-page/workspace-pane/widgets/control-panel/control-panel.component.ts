import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {DiskButtonComponent} from "src/app/components/shared/buttons/disk-button/disk-button.component";
import {WrenchButtonComponent} from "src/app/components/shared/buttons/wrench-button/wrench-button.component";
import {SettingsModalComponent} from "src/app/components/app-page/modals/settings-modal/settings-modal.component";
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent  {

  /** Input / Output **/

  @Output()
  public drawerToggle : EventEmitter<boolean> = new EventEmitter<boolean>();

  /** View Children **/

  @ViewChild('diskButton')
  private diskButtonElRef : DiskButtonComponent;

  @ViewChild('wrenchButton')
  private wrenchButtonElRef : WrenchButtonComponent;

  @ViewChild('settingsModal')
  private settingsModalElRef : SettingsModalComponent;

  /** State **/

  public drawerEnabled : boolean = false;

  constructor(private interComponentCommSvc : InterComponentCommunicationService) {}

  public toggleDrawer() {
    if (!this.drawerEnabled) {
      this.expandDrawer();
    } else {
      this.contractDrawer()
    }

  }

  /**
   * Opens the settings modal
   */
  private openSettingsModal() {
    this.interComponentCommSvc.notifyOfSettingModalOpen();
    this.settingsModalElRef.openModal();
  }

  /**
   * This method is invoked in response to the closing of the settings modal.
   * This will notify the WorkspacePaneComponent (and any other subscribers that may be added)
   * so that they can take the appropriate action
   */
  private handleSettingsModalClosed() {
    this.interComponentCommSvc.notifyOfSettingsModalClose();
  }


  /**
   * Helpers
   */

  private expandDrawer() {
    this.drawerToggle.emit(true);

    setTimeout(() => {
      this.drawerEnabled = true;
      setTimeout(() => {
        this.diskButtonElRef.setVisible(this.drawerEnabled);
        this.wrenchButtonElRef.setVisible(this.drawerEnabled);
      }, 200);
    }, 10);
  }

  private contractDrawer() {
    this.drawerToggle.emit(false);

    setTimeout(() => {
      this.diskButtonElRef.setVisible(false);
      this.wrenchButtonElRef.setVisible(false);
      setTimeout(() => {
        this.drawerEnabled = false;
      }, 10);
    }, 10);
  }

}
