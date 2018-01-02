import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeReportsListComponent }    from './time-reports-list.component';

import { AuthGuard }                from './../guards/auth-guard.service';

const timeReportsRoutes: Routes = [
  { path: 'time-reports', canActivate: [AuthGuard], component: TimeReportsListComponent },
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
