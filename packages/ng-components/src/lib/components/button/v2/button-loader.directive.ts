import {
  Directive,
  Renderer2,
  input,
  inject,
  ViewContainerRef,
  booleanAttribute,
  ComponentRef,
  afterRenderEffect,
  untracked,
  signal,
  computed,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: 'button[acpLoading]',
})
export class ButtonLoaderDirective {
  acpLoading = input(false, { transform: booleanAttribute });

  private viewContainer = inject(ViewContainerRef);
  private renderer = inject(Renderer2);

  private spinner: ComponentRef<MatProgressSpinner> | null = null;
  private readonly buttonNativeElement = signal<HTMLButtonElement>(
    this.viewContainer.element.nativeElement,
  );
  private readonly spinnerSize = computed(() => {
    const buttonHeight = this.buttonNativeElement().clientHeight;
    return buttonHeight ? Math.trunc(buttonHeight / 1.5) : 20;
  });

  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        if (this.buttonNativeElement().tagName !== 'BUTTON') {
          throw new Error(
            `ButtonLoaderDirective can only be used on a button element, but used on${this.buttonNativeElement().tagName}`,
          );
        }
      },
      write: () => {
        const loading = this.acpLoading();
        untracked(() => {
          if (loading) {
            this.buttonNativeElement().classList.add('button-loading');
            this.createSpinner();
          } else {
            this.buttonNativeElement().classList.remove('button-loading');
            this.destroySpinner();
          }
        });
      },
    });
  }

  private createSpinner(): void {
    if (!this.spinner) {
      this.spinner = this.viewContainer.createComponent(MatProgressSpinner);
      this.spinner.instance.diameter = this.spinnerSize();
      this.spinner.instance.mode = 'indeterminate';
      this.spinner.instance.strokeWidth = 2;
      const spinnerElement: HTMLElement = this.spinner.location.nativeElement;
      this.renderer.setStyle(spinnerElement, 'position', 'absolute');
      this.renderer.appendChild(this.buttonNativeElement(), spinnerElement);
    }
  }

  private destroySpinner(): void {
    this.spinner?.destroy();
    this.spinner = null;
  }
}
