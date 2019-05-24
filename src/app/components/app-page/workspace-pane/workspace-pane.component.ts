import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {SettingsStateService} from "src/app/service/settings-state-service.service";

@Component({
  selector: 'app-workspace-pane',
  templateUrl: './workspace-pane.component.html',
  styleUrls: ['./workspace-pane.component.css']
})
export class WorkspacePaneComponent implements OnInit {

  /** View Children **/

  @ViewChild('selectedTileCanvas')
  private selectedTileCanvasElRef : ElementRef;

  /** Canvas Contexts **/

  private selectedTileCanvasCtx;

  /** Layout **/

  private selectedTileCanvasWidth;
  private selectedTileCanvasHeight;

  /** State **/

  private settingsExpanded : boolean = false;

  constructor(private appCommSvc : InterComponentCommunicationService) {
    this.selectedTileCanvasWidth = window.innerWidth * .065;
    this.selectedTileCanvasHeight = window.innerWidth * .065;

    this.appCommSvc.getTileSelectionImageEmitter().subscribe((tileData : CustomButton) => {
      tileData.changeContext(this.selectedTileCanvasCtx);
      tileData.setPosition(0, 0);
      tileData.scaleToSize(this.selectedTileCanvasWidth, this.selectedTileCanvasHeight);
      tileData.draw();
    });
  }

  ngOnInit() {
    this.selectedTileCanvasCtx = this.selectedTileCanvasElRef.nativeElement.getContext("2d");
  }

  /**
   * HTML Methods
   */

  public formatSettingsPanel(expanded) {
    this.settingsExpanded = expanded;
  }


}
