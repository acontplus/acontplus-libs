import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { AcpDrawer, AcpDrawerRef } from '@acontplus/ng-components';
import { AppSettings, AppThemeColor, SettingsService } from '@core';
import { DisableControl } from '@shared';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.html',
  styleUrl: './customizer.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CdkDrag,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    DisableControl,
  ],
})
export class Customizer {
  readonly optionsChange = output<AppSettings>();

  themeColors: { value: AppThemeColor; label: string; tooltip: string; color: string }[] = [
    { value: 'blue', label: 'Blue', tooltip: 'Blue (Corporativo)', color: '#1b84ff' },
    { value: 'aqua', label: 'Aqua', tooltip: 'Aqua (Profesional)', color: '#0074ba' },
    { value: 'purple', label: 'Purple', tooltip: 'Purple (Premium)', color: '#763ebd' },
    { value: 'green', label: 'Green', tooltip: 'Green (Enterprise)', color: '#0a7ea4' },
    { value: 'cyan', label: 'Cyan', tooltip: 'Cyan (Tecnológico)', color: '#01c0c8' },
    { value: 'orange', label: 'Orange', tooltip: 'Orange (Energético)', color: '#fa896b' },
    { value: 'pink', label: 'Pink', tooltip: 'Pink (Moderno)', color: '#d200d2' },
    { value: 'rose', label: 'Rose', tooltip: 'Rose (Elegante)', color: '#e80074' },
  ];

  private readonly settings = inject(SettingsService);
  private readonly drawer = inject(AcpDrawer);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group<AppSettings>(this.settings.options);

  private formSubscription = Subscription.EMPTY;

  get isHeaderPosAbove() {
    return this.form.get('headerPos')?.value === 'above';
  }

  get isNavPosTop() {
    return this.form.get('navPos')?.value === 'top';
  }

  get isShowHeader() {
    return this.form.get('showHeader')?.value === true;
  }

  private dragging = false;

  private drawerRef?: AcpDrawerRef;

  onDragStart() {
    this.dragging = true;
  }

  openPanel(templateRef: TemplateRef<any>) {
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    this.drawerRef = this.drawer.open(templateRef, {
      position: this.form.get('dir')?.value === 'rtl' ? 'left' : 'right',
      width: '320px',
    });

    this.drawerRef.afterOpened().subscribe(() => {
      this.formSubscription = this.form.valueChanges.subscribe(() => {
        this.sendOptions(this.form.getRawValue());
      });
    });

    this.drawerRef.afterDismissed().subscribe(() => {
      this.formSubscription.unsubscribe();
    });
  }

  closePanel() {
    this.drawerRef?.dismiss();
  }

  setThemeColor(color: AppThemeColor) {
    this.form.get('themeColor')?.setValue(color);
  }

  sendOptions(options: AppSettings) {
    this.optionsChange.emit(options);
  }
}
