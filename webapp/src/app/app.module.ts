import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { AddTimeReportComponent }     from './time-reports/add-time-report.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule }       from './core/core.module';
import { AuthModule }     from './auth/auth.module';
import { TimeReportsModule }     from './time-reports/time-reports.module';
import { ProfileModule }     from './profile/profile.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),

    CoreModule,
    AuthModule,
    TimeReportsModule,
    ProfileModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    //AddTimeReportComponent,
  ],
  entryComponents: [
    AddTimeReportComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
