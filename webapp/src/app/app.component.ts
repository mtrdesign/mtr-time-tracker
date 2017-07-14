import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddTimeReportComponent } from './time-reports/add-time-report.component';

import { RootService } from './core/root.service';

import { User } from './models/user.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;

  config = {
    website: {
      title: 'Time Tracker'
    }
  }

  constructor(
    private rootService: RootService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit() {

    // Check is there is a saved data in the localStorage for a logged user
    let isUserLogged = this.rootService.isLogged();
    if (isUserLogged) {
      this.user = isUserLogged;
      this.rootService.setUser(this.user);

      // Check for a saved refeer route
      let redirecrUrl = this.rootService.redirectUrl || '/time-reports';
      this.router.navigate([redirecrUrl]);
    }

    // Subscribe for changes but wait a tick first to avoid one-time devMode unidirectional-data-flow-violation error
    this.rootService.userChange.subscribe(user => setTimeout(() => this.user = user, 0));
  }

  openAddTimeReportModal() {
    const modalRef = this.modalService.open(AddTimeReportComponent);
  }

}
