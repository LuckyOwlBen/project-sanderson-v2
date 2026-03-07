import { Routes } from '@angular/router';
import { LandingView } from './views/landing-view/landing-view';
import { AncestrySelector } from './components/ancestry-selector/ancestry-selector';

export const routes: Routes = [
  { path: '', component: LandingView },
  { path: 'home', component: LandingView },
  { path: 'ancestryView', component: AncestrySelector },
];
