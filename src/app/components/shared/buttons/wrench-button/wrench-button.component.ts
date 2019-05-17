import { Component, OnInit } from '@angular/core';
import {AbstractButtonComponent} from "src/app/components/shared/buttons/abstract-button/abstract-button.component";

@Component({
  selector: 'wrench-button',
  templateUrl: './wrench-button.component.html',
  styleUrls: ['./wrench-button.component.css', '../shared-button.css']
})
export class WrenchButtonComponent extends AbstractButtonComponent {

  constructor() {
    super();
  }

}
