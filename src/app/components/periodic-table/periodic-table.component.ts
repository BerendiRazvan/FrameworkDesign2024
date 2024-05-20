import {Component, ViewChild} from "@angular/core";
import {PopupAlertComponent} from "../popup-alert/popup-alert.component";
import {ModalType} from "../../model/modal/modal-type.enum";
import {AlertType} from "../../model/popup-alert/alert-type.enum";
import {DataTableComponent} from "../data-table/data-table.component";
import {HeaderComponent} from "../header/header.component";
import {ElementModalComponent} from "../element-modal/element-modal.component";
import {PeriodicElement} from "../../model/periodic-element/periodic-element.model";

@Component({
  selector: 'app-home',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTable {
  @ViewChild(PopupAlertComponent) alert!: PopupAlertComponent;
  @ViewChild('addElementModalComponent') addElementModal!: ElementModalComponent;
  @ViewChild('editElementModalComponent') editElementModal!: ElementModalComponent;
  @ViewChild('specialHeaderComponent') specialHeader!: HeaderComponent;
  @ViewChild('elementTablePaginatedComponent') elementTable!: DataTableComponent;

  protected readonly ModalType = ModalType;

  ngAfterViewInit(): void {
    this.specialHeader.addButton.modalInterface = this.addElementModal;
    this.elementTable.editButtons.forEach(btn => {
      btn.modalInterface = this.editElementModal;
    });
  }

  handleModalResponse(response: { alertTypeResponse: AlertType; message: string }) {
    this.alert.openAlert(response.alertTypeResponse, response.message);
    this.elementTable.setPage();
  }

  handleSelectedElement(response: any) {
    this.editElementModal.updateFieldsValues(response);
    this.editElementModal.openModal();
  }

}
