import {EventEmitter, Injectable} from '@angular/core';
import {CustomButton} from "src/app/canvas/buttons/custom-button";

@Injectable({
  providedIn: 'root'
})
export class InterComponentCommService {

  private tileSelectionImageEmitter : EventEmitter<CustomButton> = new EventEmitter<CustomButton>();

  constructor() { }

  /**
   * When a user clicks on a tile button in the selection pane,
   * it will be fed through this emitter to be consumed by other components
   * (At the moment, just the WorkspacePane)
   */
  public getTileSelectionImageEmitter() : EventEmitter<CustomButton> {
    return this.tileSelectionImageEmitter;
  }



}
