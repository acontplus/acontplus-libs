import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ExampleType {
  title: string;
  description: string;
  component: any;
  deps?: string[];
  debug?: boolean;
  files: {
    file: string;
    content?: string;
    filecontent: { default: string };
  }[];
}

@Component({
  selector: 'app-example-viewer',
  // templateUrl: './example-viewer.html',
  templateUrl: './example-viewer.html',
  styleUrl: './example-viewer.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIconButton, MatTooltipModule, MatIconModule, MatTabsModule],
})
export class ExampleViewer implements OnInit, OnDestroy {
  private readonly snackbar = inject(MatSnackBar);

  @Input() type!: string;
  @Input() exampleData!: ExampleType;

  @ViewChild('demo', { read: ViewContainerRef, static: true }) demoRef!: ViewContainerRef;
  demoComponentRef!: ComponentRef<unknown>;

  /** Whether the source for the example is being displayed. */
  showSource = false;

  ngOnInit() {
    this.demoComponentRef = this.demoRef.createComponent(this.exampleData.component);
  }

  ngOnDestroy() {
    if (this.demoComponentRef) {
      this.demoComponentRef.destroy();
    }
  }

  toggleSourceView() {
    this.showSource = !this.showSource;
  }

  copySource(element: HTMLElement) {
    const text = element.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      this.snackbar.open('Code copied', undefined, { duration: 2500 });
    });
  }
}
