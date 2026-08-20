import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AcpKpiCard } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-kpi-card-overview',
  imports: [AcpKpiCard, MatCardModule, MatDividerModule, DocHeading],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>KPI Card</app-doc-heading>

      <p class="docs-component-description">
        Professional KPI card component built on Angular Material for displaying key performance
        indicators, metrics, and dashboard data.
      </p>

      <!-- Basic KPI Cards -->
      <h2>Basic KPI Cards</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Revenue"
            value="$145,230"
            percentage="+12.4"
            icon="add"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Orders"
            value="1,542"
            percentage="+5.6"
            trend="up"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Customers"
            value="8,321"
            percentage="+18"
            trend="up"
            icon="people"
            color="info"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Conversion Rate"
            value="4.8%"
            percentage="+0.6"
            trend="up"
            icon="trending_up"
            color="secondary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Total Users"
            value="12,456"
            percentage="+8.2"
            trend="up"
            icon="group"
            color="white"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Negative Trends -->
      <h2>Negative Trends</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Products"
            value="2,134"
            percentage="-1.3"
            trend="down"
            icon="inventory"
            color="warning-light"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Alerts"
            value="45"
            percentage="+8.2"
            trend="up"
            icon="warning"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Expenses"
            value="$45,900"
            percentage="-4.1"
            trend="down"
            icon="money"
            color="error"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Bounce Rate"
            value="32.5%"
            percentage="-2.3"
            trend="down"
            icon="trending_down"
            color="neutral"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Churn"
            value="1.9%"
            percentage="0"
            trend="neutral"
            icon="trending_flat"
            color="info"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- With Descriptions -->
      <h2>With Descriptions</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Total Sales"
            value="$234,567"
            description="Last 30 days"
            percentage="+8.2"
            trend="up"
            icon="attach_money"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Active Users"
            value="12,456"
            description="Currently online"
            percentage="+15.3"
            trend="up"
            icon="person"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Support Tickets"
            value="234"
            description="Pending resolution"
            percentage="-12.1"
            trend="down"
            icon="support_agent"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Profit Margin"
            value="28.5%"
            description="Year to date"
            percentage="+3.2"
            trend="up"
            icon="trending_up"
            color="info"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- With Progress -->
      <h2>With Progress Bars</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Q4 Target"
            value="$450,000"
            description="Current: $380,500"
            [progress]="84"
            progressColor="success"
            icon="flag"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Project Completion"
            value="75%"
            description="8 of 10 tasks done"
            [progress]="75"
            progressColor="info"
            icon="assignment"
            color="secondary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Storage Usage"
            value="650 GB"
            description="Of 1000 GB available"
            [progress]="65"
            progressColor="warning"
            icon="storage"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Team Capacity"
            value="92%"
            description="Fully allocated"
            [progress]="92"
            progressColor="error"
            icon="group"
            color="error"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Variants -->
      <h2>Variants</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Default"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="default"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Elevated"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="elevated"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Outlined"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="outlined"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Filled"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="filled"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Tonal"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="tonal"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Colors -->
      <h2>All Colors</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Primary"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Secondary"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="secondary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Success"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Success Light"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="success-light"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Warning"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Warning Light"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="warning-light"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Error"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="error"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Error Light"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="error-light"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Info"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="info"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Info Light"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="info-light"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Neutral"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="neutral"
          ></acp-kpi-card>

          <acp-kpi-card
            title="White"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="white"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Sizes -->
      <h2>Sizes</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Extra Small"
            value="$25,000"
            percentage="+1.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="xs"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Small"
            value="$45,000"
            percentage="+3.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="sm"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Medium"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="md"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Large"
            value="$245,000"
            percentage="+8.5"
            trend="up"
            icon="trending_up"
            color="primary"
            size="lg"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- States -->
      <h2>States</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Normal"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card title="Loading" [loading]="true" color="primary"></acp-kpi-card>

          <acp-kpi-card
            title="Disabled"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            [disabled]="true"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Selected"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            [selected]="true"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Clickable -->
      <h2>Clickable Cards</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Click Me"
            value="$125,000"
            percentage="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            [clickable]="true"
            (clicked)="onCardClick('Revenue')"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Interactive"
            value="$245,000"
            percentage="+12.3"
            trend="up"
            icon="trending_up"
            color="success"
            [clickable]="true"
            (clicked)="onCardClick('Sales')"
          ></acp-kpi-card>

          <acp-kpi-card
            title="With Footer"
            value="$89,000"
            percentage="+2.1"
            trend="up"
            icon="trending_up"
            color="info"
            footer="Click to view details"
            [clickable]="true"
            (clicked)="onCardClick('Details')"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    h2 {
      margin-top: 32px;
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: 500;
    }

    mat-card {
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .kpi-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardOverview {
  onCardClick(context: string): void {
    // eslint-disable-next-line no-console
    console.log('KPI Card clicked:', context);
  }
}
