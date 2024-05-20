import {AfterViewInit, Component, EventEmitter, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PaginationComponent} from "../pagination/pagination.component";
import {MatSort} from "@angular/material/sort";
import {PopupAlertComponent} from "../popup-alert/popup-alert.component";
import {IconButtonComponent} from "../icon-button/icon-button.component";
import {PeriodicElement} from "../../model/periodic-element/periodic-element.model";
import {PeriodicElementService} from "../../service/periodic-element/periodic-element.service";
import {Page} from "../../model/page/page.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlertType} from "../../model/popup-alert/alert-type.enum";

@Component({
  selector: 'app-data-table',
  styleUrls: ['data-table.component.css', '../icon-button/icon-button.component.css'],
  templateUrl: 'data-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns = ['name', 'symbol', 'weight', 'editAction', 'deleteAction'];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement!: PeriodicElement;

  dataSource: MatTableDataSource<PeriodicElement>;
  pageSize !: number;
  pageNumber !: number;
  minPageSize !: number;
  minPageNumber !: number;
  maxPageSize !: number;
  maxPageNumber !: number;

  @Output() selectedElementValue = new EventEmitter<{ element: PeriodicElement }>();

  @ViewChild(PaginationComponent) paginator!: PaginationComponent;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(PopupAlertComponent) alert!: PopupAlertComponent;
  @ViewChildren(IconButtonComponent) editButtons!: QueryList<IconButtonComponent>;

  constructor(private service: PeriodicElementService) {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.minPageNumber = 1;
    this.minPageSize = 10;
    this.maxPageSize = 100;

    const data: PeriodicElement[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(data);
  }

  ngAfterViewInit() {
    this.disablingPaginationTooltip();
    this.setPage();
  }

  applyFilter(filterValue: string) {
    if (filterValue.length >= 3) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
      this.setFilteredPage();
    } else {
      this.dataSource.filter = filterValue;
      this.setPage();
    }
  }

  resetIndex(filterValue: string) {
    if (filterValue.length >= 3)
      this.paginator.emitPageEvent(0)
  }

  editItemOnClick(item: any) {
    this.selectedElementValue.emit(item);
  }

  deleteItemOnClick(item: any) {
    this.service.deleteElement(item);
    this.setPage();
    this.alert.openAlert(AlertType.SUCCESS, item.name + " deleted successfully!")
  }

  setPage() {
    if (this.dataSource.filter.length < 3) {
      this.service.getPage(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
        (page: Page) => {
          this.dataSource = new MatTableDataSource(page.elements);
          this.updateTableValues(page);
        }
      );
    } else {
      this.applyFilter(this.dataSource.filter);
    }
  }

  setFilteredPage() {
    this.service.searchElement(this.dataSource.filter, this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (page: Page) => {
        let filter = this.dataSource.filter;
        this.dataSource = new MatTableDataSource(page.elements);
        this.dataSource.filter = filter;
        this.updateTableValues(page);
      }
    );
  }

  pageSizeChanged(target: any) {
    this.pageSize = target.value;
    if (this.pageSize < this.minPageSize)
      this.pageSize = this.minPageSize;
    if (this.pageSize > this.maxPageSize)
      this.pageSize = this.maxPageSize;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = 0;
    this.paginator.emitPageEvent(0);
    this.setPage();
  }

  private updateTableValues(page: Page) {
    this.paginator.length = page.numberOfElements;
    this.paginator.pageIndex = page.currentPage;
    this.pageNumber = page.currentPage + 1;
    this.maxPageNumber = Math.trunc(page.numberOfElements / this.pageSize);
    if (page.numberOfElements % this.pageSize != 0)
      this.maxPageNumber += 1;
  }

  /** Removes random displayed tooltip for pagination buttons. */
  private disablingPaginationTooltip() {
    this.paginator._intl.firstPageLabel = "";
    this.paginator._intl.lastPageLabel = "";
    this.paginator._intl.nextPageLabel = "";
    this.paginator._intl.previousPageLabel = "";
  }

}
