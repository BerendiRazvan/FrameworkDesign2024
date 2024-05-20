import {Component, Input} from '@angular/core';
import {ModalInterface} from "../../model/modal/modal.interface";

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent {

  @Input() buttonIcon!: string; // Button icon path
  @Input() buttonText!: string; // Button name
  @Input() disableOption: boolean = false;
  modalInterface!: ModalInterface;

  constructor() {
  }

}
