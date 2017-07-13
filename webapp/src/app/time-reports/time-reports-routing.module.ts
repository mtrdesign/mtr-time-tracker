import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsListComponent }    from './reports-list.component';

import { AuthGuard }                from './../guards/auth-guard.service';

const timeReportsRoutes: Routes = [
  { path: 'time-reports', canActivate: [AuthGuard], component: ReportsListComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(timeReportsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimeReportsRoutingModule { }
