import { Routes } from '@angular/router';
import { OverviewComponent } from './features/overview/overview.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'about', component: AboutComponent },
];
