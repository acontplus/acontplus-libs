import { Routes } from '@angular/router';
import { CardsOverview } from './cards-overview';
import { CardsExamples } from './cards-examples';
import { CardsApi } from './cards-api';
import { CardsStyling } from './cards-styling';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: CardsOverview },
  { path: 'examples', component: CardsExamples },
  { path: 'api', component: CardsApi },
  { path: 'styling', component: CardsStyling },
  { path: '**', redirectTo: 'overview' },
];
