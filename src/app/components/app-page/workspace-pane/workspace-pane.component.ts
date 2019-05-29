import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InterComponentCommunicationService} from "src/app/service/inter-component-communication.service";
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {SettingsStateService} from "src/app/service/settings-state-service.service";
import {SettingsModalComponent} from "src/app/components/app-page/modals/settings-modal/settings-modal.component";

@Component({
  selector: 'app-workspace-pane',
  templateUrl: './workspace-pane.component.html',
  styleUrls: ['./workspace-pane.component.css']
})
export class WorkspacePaneComponent implements AfterViewInit {

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
  private displayDrawingBoard : boolean = true;

  constructor(private interComponentCommSvc : InterComponentCommunicationService) {
    this.selectedTileCanvasWidth = window.innerWidth * .065;
    this.selectedTileCanvasHeight = window.innerWidth * .065;

    this.interComponentCommSvc.getTileSelectionImageEmitter().subscribe((tileData : CustomButton) => {
      tileData.changeContext(this.selectedTileCanvasCtx);
      tileData.setPosition(0, 0);
      tileData.scaleToSize(this.selectedTileCanvasWidth, this.selectedTileCanvasHeight);
      tileData.draw();
    });

    this.interComponentCommSvc.getSettingsModalOpenEmitter().subscribe(() => {
      this.displayDrawingBoard = false;
    });

    this.interComponentCommSvc.getSettingsModalCloseEmitter().subscribe(() => {
      this.displayDrawingBoard = true;
    })
  }

  ngAfterViewInit() {
    this.selectedTileCanvasCtx = this.selectedTileCanvasElRef.nativeElement.getContext("2d");
  }

  /**
   * HTML Methods
   */

  public formatSettingsPanel(expanded) {
    this.settingsExpanded = expanded;
  }


}
