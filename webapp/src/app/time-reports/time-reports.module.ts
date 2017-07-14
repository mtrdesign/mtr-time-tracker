import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

import { ReportsListComponent }    from './reports-list.component';
import { AddTimeReportComponent }     from './add-time-report.component';

import { ProjectService }     from './project.service';
import { TimeReportService }     from './time-report.service';

import { AuthGuard }                from './../guards/auth-guard.service';

import { TimeReportsRoutingModule } from './time-reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MomentModule,
    TimeReportsRoutingModule,
  ],
  declarations: [
    ReportsListComponent,
    AddTimeReportComponent,
  ],
  providers: [
    AuthGuard,

    ProjectService,
    TimeReportService,
  ]
})
export class TimeReportsModule {}
