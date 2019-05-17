import { Component } from '@angular/core';
import {AbstractButtonComponent} from "src/app/components/shared/buttons/abstract-button/abstract-button.component";

@Component({
  selector: 'disk-button',
  templateUrl: './disk-button.component.html',
  styleUrls: ['./disk-button.component.css', '../shared-button.css']
})
export class DiskButtonComponent extends AbstractButtonComponent {

  constructor() {
    super();
  }

}
