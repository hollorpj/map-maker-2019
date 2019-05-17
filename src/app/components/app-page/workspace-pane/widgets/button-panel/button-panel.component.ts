import {Component, OnInit, ViewChild} from '@angular/core';
import {DiskButtonComponent} from "src/app/components/shared/buttons/disk-button/disk-button.component";
import {WrenchButtonComponent} from "src/app/components/shared/buttons/wrench-button/wrench-button.component";

@Component({
  selector: 'button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css']
})
export class ButtonPanelComponent implements OnInit {

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
    this.drawerEnabled = !this.drawerEnabled;
    setTimeout(() => {
      this.diskButtonElRef.setVisible(this.drawerEnabled);
      this.wrenchButtonElRef.setVisible(this.drawerEnabled);
    }, 200);
  }

  private contractDrawer() {
    this.drawerEnabled = !this.drawerEnabled;
    this.diskButtonElRef.setVisible(this.drawerEnabled);
    this.wrenchButtonElRef.setVisible(this.drawerEnabled);
  }

}
