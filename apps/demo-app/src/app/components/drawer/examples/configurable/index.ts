import { App } from './app';
import hljs from 'highlight.js';

const appHtml = `<h2>Drawer configuration</h2>

<section>
  <label for="">Position:</label>
  <mat-radio-group [(ngModel)]="position">
    <mat-radio-button value="top">Top</mat-radio-button>
    <mat-radio-button value="right">Right</mat-radio-button>
    <mat-radio-button value="bottom">Bottom</mat-radio-button>
    <mat-radio-button value="left">Left</mat-radio-button>
  </mat-radio-group>
</section>

<section class="size-controls">
  <mat-form-field>
    <mat-label>Width</mat-label>
    <input matInput [(ngModel)]="width" type="text" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Height</mat-label>
    <input matInput [(ngModel)]="height" type="text" />
  </mat-form-field>
</section>

<section class="checkbox-controls">
  <mat-checkbox [(ngModel)]="hasBackdrop">Has Backdrop</mat-checkbox>
  <mat-checkbox [(ngModel)]="disableClose">Disable Close</mat-checkbox>
  <mat-checkbox [(ngModel)]="closeOnNavigation">Close On Navigation</mat-checkbox>
  <mat-checkbox [(ngModel)]="fullScreen">Full Screen</mat-checkbox>
</section>

<h2>Result</h2>

<button matButton="elevated" color="primary" (click)="open()">Open</button>
`;

const appTs = `import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DrawerPosition, AcpDrawer, AcpDrawerRef } from '@acontplus/ng-components';

@Component({
  selector: 'app-drawer-configurable-example',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class App {
  private drawer = inject(AcpDrawer);

  position: DrawerPosition = 'right';
  width = '300px';
  height = '300px';
  hasBackdrop = true;
  disableClose = false;
  closeOnNavigation = true;
  fullScreen = false;

  open() {
    const drawerRef = this.drawer.open(DrawerConfigurableOverviewDrawer, {
      position: this.position,
      width: this.width,
      height: this.height,
      hasBackdrop: this.hasBackdrop,
      disableClose: this.disableClose,
      closeOnNavigation: this.closeOnNavigation,
      fullScreen: this.fullScreen,
      data: {},
    });

    drawerRef.afterDismissed().subscribe(_result => {
      console.log('The drawer was dismissed');
    });
  }
}

@Component({
  selector: 'app-drawer-overview',
  template: \`
    <h1 class="heading">
      <span>Title</span>
      <span class="flex-spacer"></span>
      <button matIconButton (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
    </h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  \`,
  styles: \`
    .heading {
      display: flex;
      align-items: center;
    }

    .flex-spacer {
      flex-grow: 1;
    }
  \`,
  imports: [MatIconModule, MatButtonModule],
})
export class DrawerConfigurableOverviewDrawer {
  private drawerRef = inject<AcpDrawerRef<DrawerConfigurableOverviewDrawer>>(AcpDrawerRef);

  onClose(): void {
    this.drawerRef.dismiss();
  }
}
`;

const appScss = `/* Estilos específicos para el ejemplo de Drawer configurable */
section {
  margin: 16px 0;
}

.size-controls {
  display: flex;
  gap: 16px;
  align-items: center;

  mat-form-field {
    flex: 1;
    margin: 0;
  }
}

.checkbox-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  mat-checkbox {
    margin: 0;
  }
}

mat-radio-group {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
}

mat-radio-button {
  margin: 0;
}

// Responsive design for smaller screens
@media (max-width: 768px) {
  .size-controls {
    flex-direction: column;
    align-items: stretch;

    mat-form-field {
      flex: none;
    }
  }

  .checkbox-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  mat-radio-group {
    flex-direction: column;
    gap: 8px;

    mat-radio-button {
      margin: 4px 0;
    }
  }
}
`;

const drawerConfigurableExampleConfig = {
  title: 'Configurable drawer',
  component: App,
  files: [
    {
      file: 'app.html',
      content: hljs.highlightAuto(appHtml, ['html']).value,
      filecontent: appHtml,
    },
    {
      file: 'app.ts',
      content: hljs.highlightAuto(appTs, ['typescript']).value,
      filecontent: appTs,
    },
    {
      file: 'app.scss',
      content: hljs.highlightAuto(appScss, ['scss']).value,
      filecontent: appScss,
    },
  ],
};

export { drawerConfigurableExampleConfig };
