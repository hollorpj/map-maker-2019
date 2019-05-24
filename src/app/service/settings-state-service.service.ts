import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsStateService {

  private workspaceTilesWide : number = 32;
  private workspaceTilesTall : number = 32;

  constructor() { }

  public getWorkspaceTilesWide() : number {
    return this.workspaceTilesWide;
  }

  public setWorkspaceTilesWide(workspaceTilesWide : number) {
    this.workspaceTilesWide = workspaceTilesWide;
  }

  public getWorkspaceTilesTall() : number {
    return this.workspaceTilesTall;
  }

  public setWorkspaceTilesTall(workspaceTilesTall : number) {
    this.workspaceTilesTall = workspaceTilesTall;
  }

}
