import {EventEmitter, Injectable} from '@angular/core';
import {CustomButton} from "src/app/canvas/buttons/custom-button";
import {Drawable} from "src/app/canvas/interface/drawable";

@Injectable({
  providedIn: 'root'
})
export class InterComponentCommunicationService {

  // Emitters

  /**
   * When a tile is clicked in the selection pane, it emits an event through this emitter
   * containing the data relating to the tile that was just clicked.
   * This tile data is then consumed by an observer in the workspace pane and used to draw the selected tile
   * in the top right corner as a preview
   */
  private tileSelectionImageEmitter : EventEmitter<CustomButton> = new EventEmitter<CustomButton>();

  private settingsModalOpenEmitter : EventEmitter<void> = new EventEmitter<void>();

  private settingsModalCloseEmitter : EventEmitter<void> = new EventEmitter<void>();

  // States

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

  /**
   * Returns the artist set by the 'setCurrentlySelectedTile' method
   */
  public getCurrentlySelectedTile() : Drawable {
    return this.currentlySelectedTile;
  }

  /**
   * Notifies subscribers that the settings modal has been opened
   */
  public notifyOfSettingModalOpen() : void {
    this.settingsModalOpenEmitter.emit();
  }

  /**
   * Returns the settingsModalOpenEmitter.
   * This method is called to get the emitter so that the component can subscribed to the emitter
   * to be notified when the settings modal is opened
   */
  public getSettingsModalOpenEmitter() : EventEmitter<void> {
    return this.settingsModalOpenEmitter;
  }

  /**
   * Notifies subscribers of the 'settingsModalCloseEmitter' that the modal has been closed.
   */
  public notifyOfSettingsModalClose() : void {
    this.settingsModalCloseEmitter.emit();
  }

  /**
   * Returns the settingsModalCloseEmitter.
   * This method is called to get the emitter so that the component can subscribed to the emitter
   * to be notified when the settings modal is close
   */
  public getSettingsModalCloseEmitter() : EventEmitter<void> {
    return this.settingsModalCloseEmitter;
  }



}
