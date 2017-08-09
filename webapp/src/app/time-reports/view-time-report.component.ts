import { Component, OnInit, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RootService } from './../core/root.service';
import { TimeReportService } from './time-report.service';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';

import { SafeHtmlPipe } from './../shared/safe-html.pipe';

import { environment } from './../../environments/environment';

@Component({
  templateUrl: './view-time-report.component.html',
})
export class ViewTimeReportComponent implements OnInit {

  @Input() timeReportId: number;
  timeReport: TimeReport;
  user: User;
  isChanged = false;

  config = {
    env: environment
  };

  constructor(
    private activeModal: NgbActiveModal,
    private rootService: RootService,
    private timeReportsService: TimeReportService) { }


  ngOnInit() {
    this.user = this.rootService.user;
    this.getTimeReport();
  }

  getTimeReport() {
    this.timeReportsService.get(this.user, this.timeReportId)
                           .subscribe(
                              timeReport => {
                                this.isChanged = true;
                                this.timeReport = timeReport
                              },
                              error => console.log(error)
                           );
  }



}
