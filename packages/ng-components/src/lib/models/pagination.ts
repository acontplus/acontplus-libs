import { PageEvent } from '@angular/material/paginator';

export interface PaginationOptions {
  hidePageSize?: boolean;
  showPageSizeOptions?: boolean;
  showFirstLastButtons?: boolean;
  disabled?: boolean;
}

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
   * @param options Display and behavior options
   */
  constructor(
    pageIndex = 0, // MatPaginator starts at 0
    pageSize = 25,
    totalRecords = 0,
    pageSizeOptions: number[] = [25, 50, 75, 100],
    options: PaginationOptions = {},
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalRecords = totalRecords;
    this.pageSizeOptions = pageSizeOptions;
    this.hidePageSize = options.hidePageSize ?? false;
    this.showPageSizeOptions = options.showPageSizeOptions ?? true;
    this.showFirstLastButtons = options.showFirstLastButtons ?? true;
    this.disabled = options.disabled ?? false;
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
