# AppFrameworkDesign

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Introduction

This is the application made for the Framework Design project, after running the `npm install`, `ng build` and `ng serve` commands, access the link [here](http://localhost:4200/periodic-table).

The project illustrates the implementation and use of several elements within a chemistry application that contains chemical elements from the periodic table.

This page is created from several components, so you can find:
- a popup alert component
- a data table component
- a pagination for table component
- a add/edit modal component
- a button component
- plus others

## App Features

The application manages the elements in the table, so there are view, add, update and delete functionalities

POZA APP

## Implementation Details - Popup Alert Component

The popup alert component contains an icon (chosen by the user), a message (chosen by the user) and a close button. It closes automatically after 5 seconds if the message is shorter than 120 characters or after more time if the message is longer. Such an alert has specific elements and can be of 4 types:

Information:
POZA ALERTA

Success:
POZA ALERTA

Warning:
POZA ALERTA

Error:
POZA ALERTA

### Usage

If you want to use this component in your own application, you must follow the following steps:

1. Copy the code from the file `./components/popup-alert`
2. Use the component in your code from the `.html` file
   '''<app-popup-alert></app-popup-alert>'''
3. Declare the component in your code from the `.ts` file corresponding to the `.html` file
   @ViewChild(PopupAlertComponent) alert!: PopupAlertComponent;
4. When you need to display an alert, call the `openAlert()` method in the code from the `.ts` file
   Information: '''this.alert.openAlert(AlertType.INFORMATION, "Your information message...")'''
   Success: '''this.alert.openAlert(AlertType.SUCCESS, "Your success message...")'''
   Warning: '''this.alert.openAlert(AlertType.WARNING, "Your warning message...")'''
   Error: '''this.alert.openAlert(AlertType.ERROR, "Your error message...")'''

