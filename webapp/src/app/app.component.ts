import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AddTimeReportComponent } from './time-reports/add-time-report.component';

import { RootService } from './core/root.service';
import { AuthService } from './auth/auth.service';
import { TimeReportService } from './time-reports/time-report.service';

import { User } from './models/user.model';

import { environment } from './../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimeReportService]
})
export class AppComponent implements OnInit {

  user: User;

  config = {
    env: environment
  };

  constructor(
    private rootService: RootService,
    private authService: AuthService,
    private timeReportsService: TimeReportService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    // Check if there is a saved data in the localStorage for a logged user
    let isUserLogged = this.rootService.isLogged();
    if (isUserLogged) {
      this.user = isUserLogged;
      this.rootService.setUser(this.user);

      // Check the token of the user
      this.authService.verifyToken(this.user)
                      .subscribe(
                        response => console.log(response),
                        error => {
                          this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' });
                          this.rootService.logout();
                          this.router.navigate(['login']);
                        }
                      );

      // Check for a saved refeer route
      //let redirecrUrl = this.rootService.redirectUrl || '/time-reports';
      //this.router.navigate([redirecrUrl]);
    }

    // Subscribe for changes but wait a tick first to avoid one-time devMode unidirectional-data-flow-violation error
    this.rootService.userChange.subscribe(user => setTimeout(() => this.user = user, 0));
  }

  openAddTimeReportModal() {
    const modalRef = this.modalService.open(AddTimeReportComponent);
    modalRef.result.then(
                     result => this.timeReportsService.refreshTimeReports(result),
                     reason => this.timeReportsService.refreshTimeReports(reason)
                   );
  }


}
