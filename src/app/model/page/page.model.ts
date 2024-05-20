import {PeriodicElement} from "../periodic-element/periodic-element.model";

export interface Page {
  currentPage: number;
  pageSize: number;
  numberOfElements: number;
  elements: PeriodicElement[];
}
