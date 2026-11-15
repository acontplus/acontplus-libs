import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ACP_KPI_CARD_SLOTS, AcpKpiCard } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { DocHeading } from '../../shared/doc-heading/doc-heading';

@Component({
  selector: 'app-kpi-card-overview',
  imports: [
    AcpKpiCard,
    ACP_KPI_CARD_SLOTS,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    DocHeading,
  ],
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
            delta="+12.4"
            icon="add"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Orders"
            value="1,542"
            delta="+5.6"
            trend="up"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Customers"
            value="8,321"
            delta="+18"
            trend="up"
            icon="people"
            color="info"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Conversion Rate"
            value="4.8%"
            delta="+0.6"
            trend="up"
            icon="trending_up"
            color="secondary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Total Users"
            value="12,456"
            delta="+8.2"
            trend="up"
            icon="group"
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
            delta="-1.3"
            trend="down"
            icon="inventory"
            color="warning"
            variant="tonal"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Alerts"
            value="45"
            delta="+8.2"
            trend="up"
            icon="warning"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Expenses"
            value="$45,900"
            delta="-4.1"
            lowerIsBetter
            trendLabel="vs last month"
            trend="down"
            icon="money"
            color="error"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Bounce Rate"
            value="32.5%"
            delta="-2.3"
            lowerIsBetter
            trend="down"
            icon="trending_down"
            color="neutral"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Churn"
            value="1.9%"
            delta="0"
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
            delta="+8.2"
            trend="up"
            icon="attach_money"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Active Users"
            value="12,456"
            description="Currently online"
            delta="+15.3"
            trend="up"
            icon="person"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Support Tickets"
            value="234"
            description="Pending resolution"
            delta="-12.1"
            trend="down"
            icon="support_agent"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Profit Margin"
            value="28.5%"
            description="Year to date"
            delta="+3.2"
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
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="default"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Elevated"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="elevated"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Outlined"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="outlined"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Filled"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            variant="filled"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Tonal"
            value="$125,000"
            delta="+5.2"
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
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Secondary"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="secondary"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Success"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="success"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Success Tonal"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="success"
            variant="tonal"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Warning"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="warning"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Warning Tonal"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="warning"
            variant="tonal"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Error"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="error"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Error Tonal"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="error"
            variant="tonal"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Info"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="info"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Info Tonal"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="info"
            variant="tonal"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Neutral"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="neutral"
          ></acp-kpi-card>

          <acp-kpi-card
            title="White"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
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
            delta="+1.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="xs-small"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Small"
            value="$45,000"
            delta="+3.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="small"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Medium"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            size="medium"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Large"
            value="$245,000"
            delta="+8.5"
            trend="up"
            icon="trending_up"
            color="primary"
            size="large"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Formatting -->
      <h2>Number Formatting</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Revenue"
            [value]="1452300.5"
            [valueFormat]="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
            [delta]="12.4"
            trendLabel="vs last month"
            icon="payments"
            variant="outlined"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Ventas"
            [value]="98765.432"
            [valueFormat]="{ maximumFractionDigits: 1 }"
            locale="es-EC"
            [delta]="-3.75"
            suffix="u"
            icon="shopping_cart"
            variant="tonal"
            color="info"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Open Tickets"
            [value]="0"
            [delta]="-100"
            lowerIsBetter
            icon="support_agent"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Alignment -->
      <h2>Alignment</h2>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Start"
            value="$125,000"
            delta="+5.2"
            icon="payments"
            align="start"
            variant="outlined"
            description="Default alignment"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Center"
            value="$125,000"
            delta="+5.2"
            icon="payments"
            align="center"
            variant="outlined"
            description="Centered content"
          ></acp-kpi-card>

          <acp-kpi-card
            title="End"
            value="$125,000"
            delta="-5.2"
            align="end"
            variant="outlined"
            [showTrendIcon]="false"
            description="No header icon, no trend icon"
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
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
          ></acp-kpi-card>

          <acp-kpi-card title="Loading" [loading]="true" color="primary"></acp-kpi-card>

          <acp-kpi-card
            title="Disabled"
            value="$125,000"
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            [disabled]="true"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Selected"
            value="$125,000"
            delta="+5.2"
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
            delta="+5.2"
            trend="up"
            icon="trending_up"
            color="primary"
            [clickable]="true"
            (clicked)="onCardClick('Revenue')"
          ></acp-kpi-card>

          <acp-kpi-card
            title="Interactive"
            value="$245,000"
            delta="+12.3"
            trend="up"
            icon="trending_up"
            color="success"
            [clickable]="true"
            (clicked)="onCardClick('Sales')"
          ></acp-kpi-card>

          <acp-kpi-card
            title="With Footer"
            value="$89,000"
            delta="+2.1"
            trend="up"
            icon="trending_up"
            color="info"
            footer="Click to view details"
            [clickable]="true"
            (clicked)="onCardClick('Details')"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Links -->
      <h2>Link Cards</h2>
      <p class="section-description">
        With <code>routerLink</code> the whole card is a native link: Enter, Ctrl+click and "open in
        new tab" work, and the card value describes the link for screen readers.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Invoices"
            [value]="1284"
            delta="+4.1"
            trendLabel="vs last month"
            icon="receipt_long"
            color="info"
            routerLink="/components/data-grid"
          ></acp-kpi-card>
          <acp-kpi-card
            title="Customers"
            [value]="86"
            delta="+9.8"
            icon="group_add"
            color="success"
            routerLink="/components/card"
          ></acp-kpi-card>
        </mat-card-content>
      </mat-card>

      <!-- Slots -->
      <h2>Slots and Headings</h2>
      <p class="section-description">
        Use <code>ACP_KPI_CARD_SLOTS</code> for custom icon, avatar, footer and menu actions. Set
        <code>headingLevel</code> when the title should be part of the page outline.
      </p>
      <mat-card class="docs-example-card">
        <mat-card-content class="kpi-grid">
          <acp-kpi-card
            title="Cash Flow"
            [headingLevel]="3"
            [value]="48250"
            [valueFormat]="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
            delta="-2.4"
            color="warning"
          >
            <ng-template acpKpiCardIcon><mat-icon>account_balance</mat-icon></ng-template>
            <ng-template acpKpiCardActions>
              <button mat-menu-item>Export</button>
              <button mat-menu-item>View report</button>
            </ng-template>
            <ng-template acpKpiCardFooter>Updated 5 minutes ago</ng-template>
          </acp-kpi-card>
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
