import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  ChangeDetectorRef,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataGrid, DataGridColumn, AdvancedDialogService, Button } from '@acontplus/ng-components';
import { NotificationService } from '@acontplus/ng-notifications';
import { ApplicationRepository } from '../../data';
import { Application } from '../../domain/application';
import { PaginationParams, PagedResult } from '@acontplus/core';
import { ApplicationAddEditComponent } from './application-add-edit/application-add-edit.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DataGrid,
    Button,
  ],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  private applicationRepository = inject(ApplicationRepository);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);
  private dialogService = inject(AdvancedDialogService);

  // Data
  applications: Application[] = [];
  selectedApplications: number[] = [];

  // UI state
  isLoading = false;

  // Pagination
  paginationLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  pagination = new PaginationParams({
    pageIndex: 1,
    pageSize: 10,
  });

  // Filters
  filters: Record<string, unknown> = {};
  searchQuery = '';

  // Template references
  readonly actionsTemplate = viewChild.required<TemplateRef<unknown>>('actionsTemplate');
  readonly statusTemplate = viewChild.required<TemplateRef<unknown>>('statusTemplate');
  readonly environmentTemplate = viewChild.required<TemplateRef<unknown>>('environmentTemplate');

  // Column definitions
  applicationColumns: DataGridColumn<Application>[] = [];

  // Status options
  statusOptions: Application['status'][] = [
    'pending',
    'processing',
    'completed',
    'failed',
    'active',
    'inactive',
    'maintenance',
    'deprecated',
  ];
  environmentOptions: Application['environment'][] = ['development', 'staging', 'production'];

  ngOnInit() {
    this.initializeColumns();
    this.loadApplications();
    // this.notificationService.toastr.show({
    //   type: 'info',
    //   message: 'Bulk operations not yet implemented',
    //   title: 'Info',
    // });
  }

  ngAfterViewInit() {
    this.updateColumnsWithTemplates();
  }

  private initializeColumns(): void {
    this.applicationColumns = [
      {
        field: 'id',
        header: 'ID',
        type: 'number',
        width: '80px',
        sortable: true,
      },
      {
        field: 'name',
        header: 'Name',
        width: '200px',
        sortable: true,
      },
      {
        field: 'version',
        header: 'Version',
        width: '120px',
      },
      {
        field: 'status',
        header: 'Status',
        width: '120px',
      },
      {
        field: 'environment',
        header: 'Environment',
        width: '140px',
      },
      {
        field: 'category',
        header: 'Category',
        width: '150px',
      },
      {
        field: 'owner',
        header: 'Owner',
        width: '150px',
      },
      {
        field: 'actions',
        header: 'Actions',
        width: '200px',
      },
    ];
  }

  private updateColumnsWithTemplates(): void {
    const actionsTemplate = this.actionsTemplate();
    const statusTemplate = this.statusTemplate();
    const environmentTemplate = this.environmentTemplate();
    if (actionsTemplate && statusTemplate && environmentTemplate) {
      // Update status column with template
      const statusColumn = this.applicationColumns.find(col => col.field === 'status');
      if (statusColumn) {
        statusColumn.cellTemplate = statusTemplate;
      }

      // Update environment column with template
      const environmentColumn = this.applicationColumns.find(col => col.field === 'environment');
      if (environmentColumn) {
        environmentColumn.cellTemplate = environmentTemplate;
      }

      // Update actions column with template
      const actionsColumn = this.applicationColumns.find(col => col.field === 'actions');
      if (actionsColumn) {
        actionsColumn.cellTemplate = actionsTemplate;
      }
    }
  }

  loadApplications(): void {
    this.isLoading = true;
    this.applicationRepository.getAll(this.pagination).subscribe({
      next: (result: PagedResult<Application>) => {
        this.applications = result.items.map(app => ({
          ...app,
          rowStyle: this.getRowStyleForStatus(app.status),
          disableSelection: app.status === 'processing' || app.status === 'maintenance',
        }));
        this.paginationLength = result.totalCount;
        this.pageIndex = result.pageIndex - 1;
        this.pageSize = result.pageSize;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: _error => {
        this.notificationService.error({ message: 'Error loading applications' });
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private getRowStyleForStatus(status: Application['status']): Record<string, string> {
    const isDark = document.documentElement.classList.contains('dark-theme');

    switch (status) {
      case 'pending':
        return isDark
          ? { backgroundColor: '#3d2914', color: '#ffb74d' }
          : { backgroundColor: '#fff3e0', color: '#e65100' };
      case 'processing':
        return isDark
          ? { backgroundColor: '#1a237e', color: '#90caf9' }
          : { backgroundColor: '#e3f2fd', color: '#1565c0' };
      case 'completed':
        return isDark
          ? { backgroundColor: '#1b5e20', color: '#81c784' }
          : { backgroundColor: '#e8f5e8', color: '#2e7d32' };
      case 'failed':
        return isDark
          ? { backgroundColor: '#b71c1c', color: '#ffcdd2' }
          : { backgroundColor: '#ffebee', color: '#c62828' };
      case 'maintenance':
        return isDark
          ? { backgroundColor: '#4a148c', color: '#ce93d8' }
          : { backgroundColor: '#fce4ec', color: '#ad1457' };
      case 'deprecated':
        return isDark
          ? { backgroundColor: '#424242', color: '#bdbdbd' }
          : { backgroundColor: '#f3e5f5', color: '#6a1b9a' };
      default:
        return {};
    }
  }

  onPageChange(event: PageEvent): void {
    this.pagination.pageIndex = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadApplications();
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.filters['search'] = query;
    } else {
      delete this.filters['search'];
    }
    this.pagination.pageIndex = 1;
    this.loadApplications();
  }

  clearFilters(): void {
    this.filters = {};
    this.searchQuery = '';
    this.pagination.pageIndex = 1;
    this.loadApplications();
  }

  createApplication(): void {
    this.dialogService
      .openInWrapper(
        {
          component: ApplicationAddEditComponent,
          title: 'Nueva Aplicación',
          icon: 'add',
          data: {},
        },
        {
          size: 'lg',
        },
      )
      .then(dialogRef => {
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadApplications();
          }
        });
      });
  }

  startEdit(application: Application): void {
    this.dialogService
      .openInWrapper(
        {
          component: ApplicationAddEditComponent,
          title: 'Editar Aplicación',
          icon: 'edit',
          data: { application },
        },
        {
          size: 'lg',
        },
      )
      .then(dialogRef => {
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadApplications();
          }
        });
      });
  }

  deleteApplication(applicationId: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationRepository.delete(applicationId).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.notificationService.success({ message: 'Application deleted successfully' });
            this.loadApplications();
            this.cdr.markForCheck();
          } else {
            this.notificationService.error({ message: 'Failed to delete application' });
          }
        },
        error: _error => {
          this.notificationService.error({ message: 'Error deleting application' });
        },
      });
    }
  }

  onRowSelected(selectedRows: Application[]): void {
    this.selectedApplications = selectedRows.map(application => application.id);
    this.cdr.markForCheck();
  }

  bulkActivateApplications(): void {
    if (this.selectedApplications.length === 0) {
      this.notificationService.warning({ message: 'No applications selected' });
      return;
    }

    // For bulk operations, we'll need to implement bulk update in repository
    // For now, show a message
    this.notificationService.info({ message: 'Bulk operations not yet implemented' });
  }

  bulkDeactivateApplications(): void {
    if (this.selectedApplications.length === 0) {
      this.notificationService.warning({ message: 'No applications selected' });
      return;
    }

    this.notificationService.info({ message: 'Bulk operations not yet implemented' });
  }

  bulkDeleteApplications(): void {
    if (this.selectedApplications.length === 0) {
      this.notificationService.warning({ message: 'No applications selected' });
      return;
    }

    if (
      confirm(`Are you sure you want to delete ${this.selectedApplications.length} applications?`)
    ) {
      // For bulk delete, we'll need to implement it in repository
      this.notificationService.info({ message: 'Bulk delete not yet implemented' });
    }
  }

  getSelectedCount(): number {
    return this.selectedApplications.length;
  }

  getStatusColor(status: Application['status']): string {
    switch (status) {
      case 'pending':
        return 'accent';
      case 'processing':
        return 'primary';
      case 'completed':
        return 'primary';
      case 'failed':
        return 'warn';
      case 'active':
        return 'primary';
      case 'inactive':
        return 'warn';
      case 'maintenance':
        return 'accent';
      case 'deprecated':
        return 'warn';
      default:
        return 'basic';
    }
  }

  getEnvironmentColor(environment: Application['environment']): string {
    switch (environment) {
      case 'development':
        return 'accent';
      case 'staging':
        return 'warn';
      case 'production':
        return 'primary';
      default:
        return 'basic';
    }
  }
}
