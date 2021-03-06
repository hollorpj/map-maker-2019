import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-button',
  templateUrl: './abstract-button.component.html',
  styleUrls: ['./abstract-button.component.css']
})
export class AbstractButtonComponent {

  public visible : boolean = false;

  constructor() { }

  /**
   * API Methods
   */

  public setVisible(visible : boolean) {
    this.visible = visible;
  }

}
