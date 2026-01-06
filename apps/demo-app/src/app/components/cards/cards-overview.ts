import { Component } from '@angular/core';

import { DynamicCard } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { DocHeading } from '../../shared/doc-heading/doc-heading';
import { CodeExample } from '../../shared/code-example/code-example';

@Component({
  selector: 'app-cards-overview',
  imports: [DynamicCard, MatCardModule, DocHeading, CodeExample],
  template: `
    <div class="docs-component-viewer-content">
      <app-doc-heading>Cards</app-doc-heading>

      <p class="docs-component-description">
        Versatile card component wrapping Angular Material's mat-card with additional functionality
        including configurable headers, actions, and button integration.
      </p>

      <h2>Basic Card</h2>
      <div class="example-container">
        <acp-dynamic-card
          [cardTitle]="'Basic Card'"
          [cardSubtitle]="'This is a subtitle'"
          [isHeaderVisible]="true"
        >
          <p>This is the card content. You can place any content here.</p>
          <p>Cards are surfaces that display content and actions on a single topic.</p>
        </acp-dynamic-card>
      </div>

      <app-code-example [code]="basicCardCode" [language]="'typescript'" />

      <h2>Card with Actions</h2>
      <div class="example-container">
        <acp-dynamic-card
          [cardTitle]="'Product Details'"
          [cardSubtitle]="'Premium Package'"
          [isHeaderVisible]="true"
          [areActionsVisible]="true"
          [primaryButtonText]="'Buy Now'"
          [secondaryButtonText]="'Learn More'"
          (primaryButtonClicked)="onPrimaryAction()"
          (secondaryButtonClicked)="onSecondaryAction()"
        >
          <div class="card-content">
            <p><strong>Price:</strong> $99.99/month</p>
            <p><strong>Features:</strong></p>
            <ul>
              <li>Unlimited access</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
          </div>
        </acp-dynamic-card>
      </div>

      <app-code-example [code]="cardWithActionsCode" [language]="'typescript'" />

      <h2>Card Without Header</h2>
      <div class="example-container">
        <acp-dynamic-card
          [isHeaderVisible]="false"
          [areActionsVisible]="true"
          [primaryButtonText]="'Confirm'"
          (primaryButtonClicked)="onConfirm()"
        >
          <div class="card-content">
            <h3 style="margin-top: 0;">Custom Content Card</h3>
            <p>This card has no header but includes action buttons at the bottom.</p>
          </div>
        </acp-dynamic-card>
      </div>

      <app-code-example [code]="noHeaderCardCode" [language]="'typescript'" />

      <h2>Multiple Cards Grid</h2>
      <div class="cards-grid">
        <acp-dynamic-card
          [cardTitle]="'Dashboard'"
          [cardSubtitle]="'Overview'"
          [isHeaderVisible]="true"
        >
          <p>Quick stats and metrics</p>
        </acp-dynamic-card>

        <acp-dynamic-card
          [cardTitle]="'Analytics'"
          [cardSubtitle]="'Performance'"
          [isHeaderVisible]="true"
        >
          <p>Data visualization</p>
        </acp-dynamic-card>

        <acp-dynamic-card
          [cardTitle]="'Reports'"
          [cardSubtitle]="'Monthly'"
          [isHeaderVisible]="true"
        >
          <p>Generated reports</p>
        </acp-dynamic-card>
      </div>

      <app-code-example [code]="gridCardsCode" [language]="'typescript'" />
    </div>
  `,
  styles: [
    `
      .docs-component-viewer-content {
        padding: 24px;
        max-width: 1200px;
      }

      .docs-component-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: var(--mat-sys-on-surface-variant);
      }

      h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 32px 0 16px;
        color: var(--mat-sys-on-surface);
      }

      .example-container {
        margin-bottom: 24px;
        max-width: 600px;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .card-content {
        line-height: 1.6;
      }

      .card-content ul {
        margin: 8px 0;
        padding-left: 24px;
      }
    `,
  ],
})
export class CardsOverview {
  basicCardCode = `<acp-dynamic-card
  [cardTitle]="'Basic Card'"
  [cardSubtitle]="'This is a subtitle'"
  [isHeaderVisible]="true"
>
  <p>This is the card content.</p>
</acp-dynamic-card>`;

  cardWithActionsCode = `<acp-dynamic-card
  [cardTitle]="'Product Details'"
  [cardSubtitle]="'Premium Package'"
  [isHeaderVisible]="true"
  [areActionsVisible]="true"
  [primaryButtonText]="'Buy Now'"
  [secondaryButtonText]="'Learn More'"
  (primaryButtonClicked)="onPrimaryAction()"
  (secondaryButtonClicked)="onSecondaryAction()"
>
  <p><strong>Price:</strong> $99.99/month</p>
</acp-dynamic-card>`;

  noHeaderCardCode = `<acp-dynamic-card
  [isHeaderVisible]="false"
  [areActionsVisible]="true"
  [primaryButtonText]="'Confirm'"
  (primaryButtonClicked)="onConfirm()"
>
  <h3>Custom Content Card</h3>
  <p>This card has no header.</p>
</acp-dynamic-card>`;

  gridCardsCode = `<div class="cards-grid">
  <acp-dynamic-card
    [cardTitle]="'Dashboard'"
    [isHeaderVisible]="true"
  >
    <p>Quick stats</p>
  </acp-dynamic-card>
  
  <acp-dynamic-card
    [cardTitle]="'Analytics'"
    [isHeaderVisible]="true"
  >
    <p>Performance data</p>
  </acp-dynamic-card>
</div>`;

  onPrimaryAction() {
    alert('Primary action clicked');
  }

  onSecondaryAction() {
    alert('Secondary action clicked');
  }

  onConfirm() {
    alert('Confirmed');
  }
}
