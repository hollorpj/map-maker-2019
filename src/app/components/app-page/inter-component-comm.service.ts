import {EventEmitter, Injectable} from '@angular/core';
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {Drawable} from "src/app/canvas/interface/drawable";

@Injectable({
  providedIn: 'root'
})
export class InterComponentCommService {

  private tileSelectionImageEmitter : EventEmitter<CustomButton> = new EventEmitter<CustomButton>();

  private currentlySelectedTile : Drawable;

  constructor() { }

  /**
   * When a user clicks on a tile button in the selection pane,
   * it will be fed through this emitter to be consumed by other components
   * (At the moment, just the WorkspacePane)
   */
  public getTileSelectionImageEmitter() : EventEmitter<CustomButton> {
    return this.tileSelectionImageEmitter;
  }

  /**
   * Sets the artist associated with the currently selected tile.
   * This will be fetched later when the grid is clicked
   */
  public setCurrentlySelectedTile(tile : Drawable) {
    this.currentlySelectedTile = tile;
  }

  public getCurrentlySelectedTile() : Drawable {
    return this.currentlySelectedTile;
  }



}
