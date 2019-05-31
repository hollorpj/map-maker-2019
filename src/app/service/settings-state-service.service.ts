import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsStateService {

  private workspaceTilesWide : number = 32;
  private workspaceTilesTall : number = 32;

  private workspaceDimensionEmitter : EventEmitter<number[]> = new EventEmitter();

  constructor() { }

  public getWorkspaceTilesWide() : number {
    return this.workspaceTilesWide;
  }

  public setWorkspaceDimensions(workspaceTilesWide : number, workspaceTilesTall : number) {
    this.workspaceTilesWide = workspaceTilesWide;
    this.workspaceTilesTall = workspaceTilesTall;
    this.workspaceDimensionEmitter.emit([ workspaceTilesWide, workspaceTilesTall ]);
  }

  public getWorkspaceDimensionEmitter() : EventEmitter<number[]> {
    return this.workspaceDimensionEmitter;
  }

  public getWorkspaceTilesTall() : number {
    return this.workspaceTilesTall;
  }

}
