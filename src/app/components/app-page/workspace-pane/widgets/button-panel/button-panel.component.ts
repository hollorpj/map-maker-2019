import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DiskButtonComponent} from "src/app/components/shared/buttons/disk-button/disk-button.component";
import {WrenchButtonComponent} from "src/app/components/shared/buttons/wrench-button/wrench-button.component";

@Component({
  selector: 'button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css']
})
export class ButtonPanelComponent implements OnInit {

  /** Input / Output **/

  @Output()
  public drawerToggle : EventEmitter<boolean> = new EventEmitter<boolean>();

  /** View Children **/

  @ViewChild('diskButton')
  private diskButtonElRef : DiskButtonComponent;

  @ViewChild('wrenchButton')
  private wrenchButtonElRef : WrenchButtonComponent;

  /** State **/

  public drawerEnabled : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleDrawer() {

    if (!this.drawerEnabled) {
      this.expandDrawer();
    } else {
      this.contractDrawer()
    }

  }

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
