import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AcpRadioCard, AcpRadioCardGroup } from '@acontplus/ng-components';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  id: number;
  name: string;
}

@Component({
  selector: 'app-radio-card-page',
  imports: [AcpRadioCard, AcpRadioCardGroup, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './radio-card.html',
  styleUrl: './radio-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioCardPage {
  // Ejemplos existentes
  paymentMethod = new FormControl('cash');
  plan = new FormControl('monthly');
  size = new FormControl('medium');
  disabledOption = new FormControl('option-1');
  noIcon = new FormControl('a');

  // Nuevos ejemplos
  shippingMethod = new FormControl('standard');
  notification = new FormControl('email');
  currency = new FormControl('usd');

  // Ejemplo con objetos y compareWith
  projects: Project[] = [
    { id: 1, name: 'AcontPlus ERP' },
    { id: 2, name: 'Demo App' },
    { id: 3, name: 'UI Kit' },
  ];
  selectedProject = new FormControl<Project>(this.projects[0]);

  // Ejemplo grupo deshabilitado
  groupDisabled = new FormControl('opt-a');

  // Ejemplo de tamaños
  cardSize = new FormControl('medium');

  // Ejemplos de color
  cardColor = new FormControl('primary');
  cardTonal = new FormControl('email');
  cardCustomBg = new FormControl('dark');

  // Ejemplos de background preset
  cardBgSuccess = new FormControl('active');
  cardBgWarning = new FormControl('pending');
  cardBgInfo = new FormControl('draft');
  cardBgLight = new FormControl('option-1');
  cardBgDark = new FormControl('night');

  // Comparador para objetos Project
  compareProjects = (a: unknown, b: unknown): boolean => {
    return (
      a != null &&
      b != null &&
      typeof a === 'object' &&
      typeof b === 'object' &&
      'id' in a &&
      'id' in b &&
      a.id === b.id
    );
  };
}
