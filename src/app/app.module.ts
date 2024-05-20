import {AppComponent} from "./app.component";
import {PopupAlertComponent} from "./components/popup-alert/popup-alert.component";
import {NgModule} from "@angular/core";
import {RouterModule, RouterOutlet} from "@angular/router";
import {PeriodicTable} from "./components/periodic-table/periodic-table.component";
import {AppRoutingModule, routes} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconButtonComponent} from "./components/icon-button/icon-button.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {DataTableComponent} from "./components/data-table/data-table.component";
import {ElementModalComponent} from "./components/element-modal/element-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    PeriodicTable,
    PopupAlertComponent,
    IconButtonComponent,
    PaginationComponent,
    HeaderComponent,
    DataTableComponent,
    ElementModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {

}
