import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PeriodicTable} from "./components/periodic-table/periodic-table.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '',   // base path
    component: AppComponent,
    data: {
      title: 'App'
    },
    children: [
      {
        path: 'periodic-table',
        component: PeriodicTable,
        data: {
          title: 'Periodic table'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
