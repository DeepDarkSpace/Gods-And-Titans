import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GodsComponent } from './gods/gods.component';
import { GodDetailComponent } from './god-detail/god-detail.component';
import { TitansComponent } from './titans/titans.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: GodDetailComponent },
  { path: 'gods', component: GodsComponent },
  { path: 'titans', component: TitansComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
