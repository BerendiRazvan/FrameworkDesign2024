import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {AlertType} from "../popup-alert/alert-type.enum";
import {PeriodicElementService} from "../../service/periodic-element/periodic-element.service";
import {ModalType} from "../../model/modal/modal-type.enum";
import {ModalInterface} from "../../model/modal/modal.interface";
import {PeriodicElement} from "../../model/periodic-element/periodic-element.model";
import {PopupAlertComponent} from "../popup-alert/popup-alert.component";

@Component({
  selector: 'app-element-modal',
  templateUrl: './element-modal.component.html',
  styleUrls: ['./element-modal.component.css']
})

export class ElementModalComponent implements ModalInterface, OnInit {
  @ViewChild(PopupAlertComponent) alert!: PopupAlertComponent;

  @Input({required: true}) modalType!: ModalType;
  @Input() modalTitle!: string;
  @Input() modalButton!: string;
  private modalOpenStateSubject = new Subject<boolean>();
  modalOpen$ = this.modalOpenStateSubject.asObservable();
  periodicElementForm!: FormGroup;
  elementForEdit!: PeriodicElement;
  @Input() name: string = "";
  @Input() symbol: string = "";
  @Input() weight!: number;
  @Input() description: string = "";
  isEditable!: boolean;
  nameErrorMessage: string = "";
  symbolErrorMessage: string = "";
  weightErrorMessage: string = "";
  descriptionErrorMessage: string = "";

  @Output() modalResponse = new EventEmitter<{ alertTypeResponse: AlertType, message: string }>();

  constructor(private formBuilder: FormBuilder, private service: PeriodicElementService) {
  }

  ngOnInit(): void {
    this.periodicElementForm = this.formBuilder.group({
      name: this.name,
      symbol: this.symbol,
      weight: this.weight,
      description: this.description
    });

    if (this.modalType === (ModalType.EDIT as ModalType))
      this.isEditable = true;
  }

  onSubmit() {
    this.name = this.periodicElementForm.get('name')?.value;
    this.symbol = this.periodicElementForm.get('symbol')?.value;
    this.weight = this.periodicElementForm.get('weight')?.value;
    this.description = this.periodicElementForm.get('description')?.value;

    let isValidName = this.validateName();
    let isSymbolName = this.validateSymbol();
    let isWeightName = this.validateWeight();
    let isDescriptionName = this.validateDescription();

    if (isValidName && isSymbolName && isWeightName && isDescriptionName) {
      if (this.modalType === ModalType.ADD) {
        this.addNewElement();
      }
      if (this.modalType === ModalType.EDIT) {
        this.editElement();
      }
    } else {
      this.alert.openAlert(AlertType.ERROR, "Please complete all the fields to be able to add a new element!")
    }
  }

  addNewElement() {
    this.service.addElement({
      name: this.name,
      symbol: this.symbol,
      weight: this.weight,
      description: this.description
    });
    this.modalResponse.emit({alertTypeResponse: AlertType.SUCCESS, message: "Periodic element added successfully!"});
    this.closeModal();
  }

  editElement() {
    if (this.elementForEdit.name == this.name &&
      this.elementForEdit.symbol == this.symbol &&
      this.elementForEdit.weight == this.weight &&
      this.elementForEdit.description == this.description) {
      this.alert.openAlert(AlertType.WARNING, "The data for " + this.name + " remained unchanged!");
      return;
    }

    this.service.editElement(this.elementForEdit, {
      name: this.name,
      symbol: this.symbol,
      weight: this.weight,
      description: this.description
    });
    this.modalResponse.emit({alertTypeResponse: AlertType.SUCCESS, message: "Periodic element edited successfully!"});
    this.closeModal();
  }

  updateFieldsValues(periodicElement: any) {
    this.elementForEdit = periodicElement;
    this.periodicElementForm.setValue({
      name: periodicElement.name,
      symbol: periodicElement.symbol,
      weight: periodicElement.weight,
      description: periodicElement.description,
    });
  }

  openModal(): void {
    this.modalOpenStateSubject.next(true);
  }

  closeModal(): void {
    this.name = "";
    this.symbol = "";
    this.weight = 0;
    this.description = "";

    this.resetNameError();
    this.resetSymbolError();
    this.resetWeightError();
    this.resetDescriptionError();

    this.periodicElementForm.setValue({
      name: this.name,
      symbol: this.symbol,
      weight: this.weight,
      description: this.description
    });

    this.modalOpenStateSubject.next(false);
  }

  resetNameError() {
    this.nameErrorMessage = "";
  }

  resetSymbolError() {
    this.symbolErrorMessage = "";
  }

  resetWeightError() {
    this.weightErrorMessage = "";
  }

  resetDescriptionError() {
    this.descriptionErrorMessage = "";
  }

  private validateName() {
    this.resetNameError();
    if (this.name.length === 0) this.nameErrorMessage += "Please complete this filed!\n";
    else {
      if (this.name.length < 2) this.nameErrorMessage += "The name should be at least two characters long!\n";
    }
    return this.nameErrorMessage.length === 0;
  }

  private validateSymbol() {
    this.resetSymbolError();
    if (this.symbol.length === 0) this.symbolErrorMessage += "Please complete this filed!\n";
    else {
      if (this.symbol.length < 1 || this.symbol.length > 2) this.symbolErrorMessage += "The symbol should have one or two characters!\n";
    }
    return this.symbolErrorMessage.length === 0;
  }

  private validateWeight() {
    this.resetWeightError();
    if (this.weight == undefined) this.weightErrorMessage += "Please complete this filed!";
    return this.weightErrorMessage.length === 0;
  }

  private validateDescription() {
    this.resetDescriptionError();
    if (this.description.length === 0) this.descriptionErrorMessage += "Please complete this filed!\n";
    else {
      if (this.description.length < 10) this.descriptionErrorMessage += "The description should be at least ten characters long!\n";
    }
    return this.descriptionErrorMessage.length === 0;
  }


}
