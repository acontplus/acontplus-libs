import { PageEvent } from '@angular/material/paginator';

export class Pagination {
  totalRecords: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];

  hidePageSize: boolean;
  showPageSizeOptions: boolean;
  showFirstLastButtons: boolean;
  disabled: boolean;

  /**
   * @param pageIndex Current page index (0-based for MatPaginator compatibility)
   * @param pageSize Number of records per page
   * @param totalRecords Total number of records
   * @param pageSizeOptions Available page size options
   * @param hidePageSize Whether to hide the page size selector
   * @param showPageSizeOptions Whether to show page size options
   * @param showFirstLastButtons Whether to show first/last buttons
   * @param disabled Whether the paginator is disabled
   */
  constructor(
    pageIndex = 0, // MatPaginator starts at 0
    pageSize = 25,
    totalRecords = 0,
    pageSizeOptions: number[] = [25, 50, 75, 100],
    hidePageSize = false,
    showPageSizeOptions = true,
    showFirstLastButtons = true,
    disabled = false,
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalRecords = totalRecords;
    this.pageSizeOptions = pageSizeOptions;
    this.hidePageSize = hidePageSize;
    this.showPageSizeOptions = showPageSizeOptions;
    this.showFirstLastButtons = showFirstLastButtons;
    this.disabled = disabled;
  }

  /**
   * Calculates the total number of pages.
   */
  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  /**
   * Handles page event similar to Angular Material example.
   * @param event MatPaginator PageEvent
   */
  handlePageEvent(event: PageEvent): void {
    this.totalRecords = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
