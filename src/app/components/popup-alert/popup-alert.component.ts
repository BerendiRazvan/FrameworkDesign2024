import {Component} from '@angular/core';
import {AlertType} from "./alert-type.enum";

@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css']
})
export class PopupAlertComponent {
  isShown: boolean;
  alertType!: AlertType;
  alertInfoMessage!: string;
  alertTypeMessage!: string;
  alertTypeIcon!: string;
  style!: string;
  timeout!: ReturnType<typeof setTimeout>;

  constructor() {
    this.isShown = false;
  }

  openAlert(alertType: AlertType, message: string) {
    if (this.timeout)
      clearTimeout(this.timeout)

    this.alertType = alertType;
    this.alertTypeMessage = this.alertType.toString();
    this.alertInfoMessage = message;

    switch (this.alertType) {
      case (AlertType.SUCCESS as AlertType):
        this.alertTypeIcon = "assets/icons/success-icon.svg";
        this.style = "alert-success";
        break;
      case (AlertType.ERROR as AlertType):
        this.alertTypeIcon = "assets/icons/error-icon.svg";
        this.style = "alert-danger";
        break;
      case (AlertType.WARNING as AlertType):
        this.alertTypeIcon = "assets/icons/warning-icon.svg";
        this.style = "alert-warning";
        break;
      case (AlertType.INFORMATION as AlertType):
        this.alertTypeIcon = "assets/icons/information-icon.svg";
        this.style = "alert-primary";
        break;
    }

    this.showAlert();

  }

  protected closeAlert() {
    this.isShown = false;
    this.alertTypeMessage = "";
    this.alertInfoMessage = "";
    if (this.timeout)
      clearTimeout(this.timeout)
  }

  private showAlert() {
    this.isShown = true;
    this.timeout = setTimeout(() => {
      this.isShown = false;
      this.alertInfoMessage = "";
    }, ((this.alertInfoMessage.length < 120) ? 5000 : this.alertInfoMessage.length * 50));
  }
}
