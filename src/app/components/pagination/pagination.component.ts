import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from "@angular/core";
import {
  MatPaginator,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorDefaultOptions,
  MatPaginatorIntl
} from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends MatPaginator implements OnInit {

  hiddenPageValue = "...";

  pagesNumberList: number[] = [
    this.pageIndex + 2,
    this.pageIndex + 3,
    this.pageIndex + 4,
    this.pageIndex + 5,
    this.pageIndex + 6,
    this.pageIndex + 7,
    this.pageIndex + 8,
  ];

  constructor(
    intl: MatPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS) defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }

  emitPageEvent(selectedPageIndex: number) {
    if (selectedPageIndex < 0) selectedPageIndex = 0;
    if (selectedPageIndex > this.getMaxPageNumber()) selectedPageIndex = this.getMaxPageNumber();
    this.pageIndex = selectedPageIndex;
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
    this.updatePageIndex();
  }

  getMaxPageNumber() {
    let maxPageNumber = Math.trunc(this.length / this.pageSize);
    if (this.length % this.pageSize != 0)
      maxPageNumber += 1;
    return maxPageNumber;
  }

  updatePageIndex() {
    let i = 0;
    if (this.pageIndex > this.getMaxPageNumber() - 5)
      i = this.getMaxPageNumber() - this.pageIndex - 5;
    if (this.pageIndex < 5)
      i = 5 - this.pageIndex - 1;

    if (this.getMaxPageNumber() >= 9) {
      this.pagesNumberList = [
        this.pageIndex + i - 2,
        this.pageIndex + i - 1,
        this.pageIndex + i,
        this.pageIndex + i + 1,
        this.pageIndex + i + 2,
        this.pageIndex + i + 3,
        this.pageIndex + i + 4
      ];
    } else {
      this.pagesNumberList = [2, 3, 4, 5, 6, 7, 8];
    }
  }

  hidePageNumber(pageNumber: number) {
    if (pageNumber - 1 == 1 || pageNumber + 1 == this.getMaxPageNumber()) return pageNumber;
    return this.hiddenPageValue;
  }

  protected readonly Math = Math;

  setSelectedStyle(pageNumber: number) {
    if (pageNumber - 1 == this.pageIndex) return "is-selected";
    return "";
  }

  isPageVisible(pageIndex: number) {
    if (pageIndex == -1 && 1 < this.getMaxPageNumber()) return true;
    return this.pagesNumberList[pageIndex] < this.getMaxPageNumber() && this.pagesNumberList[pageIndex] > 1;
  }

}
