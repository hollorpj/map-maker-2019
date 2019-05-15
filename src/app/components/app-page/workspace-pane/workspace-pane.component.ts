import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InterComponentCommService} from "src/app/components/app-page/inter-component-comm.service";
import {CustomButton} from "src/app/canvas/buttons/custom-button";

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

  constructor(private appCommSvc : InterComponentCommService) {
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


}
