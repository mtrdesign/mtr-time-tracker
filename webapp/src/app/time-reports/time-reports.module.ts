import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ReportsListComponent }    from './reports-list.component';

import { AuthGuard }                from './../guards/auth-guard.service';

import { TimeReportsRoutingModule } from './time-reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeReportsRoutingModule,
  ],
  declarations: [
    ReportsListComponent,
  ],
  providers: [
    AuthGuard,
  ]
})
export class TimeReportsModule {}
