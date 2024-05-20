import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IconButtonComponent} from "../icon-button/icon-button.component";
import {PopupAlertComponent} from "../popup-alert/popup-alert.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() backgroundImage!: string; // Header image path
  @Input() buttonIcon!: string; // Button icon path
  @Input() buttonText!: string; // Button name
  @Input() isAddButtonVisible: boolean = true;
  @ViewChild('addButton') addButton!: IconButtonComponent;
  @Output() openModalWithCountries = new EventEmitter<{ action: 'add'; data: any }>();
  @ViewChild(PopupAlertComponent) alert !: PopupAlertComponent;
  @Output() openModalWithTenants = new EventEmitter<{ action: 'add'; data: any }>();

  constructor() {
  }

  openAddModal() {
      this.addButton.modalInterface.openModal();
  }
}
