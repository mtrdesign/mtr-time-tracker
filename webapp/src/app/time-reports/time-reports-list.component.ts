
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/forkJoin';

import { AddTimeReportComponent } from './../time-reports/add-time-report.component';
import { ViewTimeReportComponent } from './../time-reports/view-time-report.component';

import { RootService } from './../core/root.service';
import { ProjectService } from './project.service';
import { TimeReportService } from './time-report.service';
import { UserService } from './../shared/user.service';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';
import { Project } from './../models/project.model';

import { environment } from './../../environments/environment';

@Component({
  templateUrl: './time-reports-list.component.html',
  styleUrls: ['./time-reports-list.component.css']
})
export class TimeReportsListComponent implements OnInit, OnDestroy {

  listTimeReportsForm: FormGroup;
  user: User;
  timeReports: Array<TimeReport> = [];
  profilesTimeReports: Array<TimeReport> = [];
  projectsTimeReports: Array<TimeReport> = [];
  totalHoursTimeReports = null;
  profiles: Array<User> = [];
  projects: Array<Project> = [];

  config = {
    pageTitle: 'Time Reports',
    env: environment
  };

  routerSubscriber;
  timeReportsSubscription: Subscription;

  isLoading = {
    timeReports: false,
    profilesTimeReports: false,
    projectsTimeReports: false,
  }

  constructor(
    private rootService: RootService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private timeReportsService: TimeReportService,
    private datepickerConfig: NgbDatepickerConfig,
    private datepickerParserFormatter: NgbDateParserFormatter,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title) {

    this.toastr.setRootViewContainerRef(vcr);
    this.createListTimeReportsForm();
    this.setupDatepickerConfigs();
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.config.pageTitle} - ${this.config.env.website.title} | ${this.config.env.website.company}`);
    this.user = this.rootService.user;

    let getProjects = this.projectService.getProjects(this.user);
    let getProfiles = this.userService.getProfiles(this.user);

    Observable.forkJoin([getProjects, getProfiles])
              .subscribe(
                response => {
                  this.projects = response[0];
                  this.profiles = response[1];

                  this.fillListTimeReportsForm();

                  // Check for query params which are already in the URL
                  this.handleQueryParamsFilters(this.route.snapshot.queryParams);
                },
                error => {
                  this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' });
                }
              );

    this.routerSubscriber = this.router.events.subscribe(
                                                event => {
                                                  if (event instanceof NavigationEnd) {
                                                    let params = this.route.snapshot.queryParams;
                                                    this.handleQueryParamsFilters(params);
                                                  }
                                                }
                                              );

    this.timeReportsSubscription = this.timeReportsService.refreshTimeReportsSource$
                                                          .subscribe(response => this.getTimeReportsData());
  }

  ngOnDestroy() {
    this.routerSubscriber.unsubscribe();
  }

  /**
   * Create the form filters
   */
  createListTimeReportsForm() {
    this.listTimeReportsForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      project: 0,
      profile: 0,
    });
  }

  /**
   * Fill the form wiith default values
   */
  fillListTimeReportsForm() {
    let dateStartOfMonth: moment.Moment = moment().startOf('month');
    let dateNow: moment.Moment = moment();

    this.listTimeReportsForm.patchValue({
      project: 0,
      profile: 0,
      fromDate: this.dateToNgbStruct(dateStartOfMonth.format('YYYY-MM-DD')),
      toDate: this.dateToNgbStruct(dateNow.format('YYYY-MM-DD'))
    });
  }

  /**
   * Apply the query params to the filters form and forche new fetch of the data
   * @param {any} params [description]
   */
  handleQueryParamsFilters(params: any) {
    if (params.fromDate) {
      this.listTimeReportsForm.patchValue({ fromDate: this.dateToNgbStruct(params.fromDate) });
    }

    if (params.toDate) {
      this.listTimeReportsForm.patchValue({ toDate: this.dateToNgbStruct(params.toDate) });
    }

    if (params.project) {
      this.listTimeReportsForm.patchValue({ project: params.project });
    }

    if (params.profile) {
      this.listTimeReportsForm.patchValue({ profile: params.profile });
    }

    // Get time reports data according to the filters above
    this.getTimeReportsData();

    // Open a modal with info about the time report if provided
    if (params.report) {
      const modalRef = this.modalService.open(ViewTimeReportComponent, {
        backdrop: "static",
        size: "lg"
      });
      modalRef.componentInstance.timeReportId = params.report;

      modalRef.result.then(
                       result => {
                         var queryParams = Object.assign({}, this.route.snapshot.queryParams);
                         delete queryParams.report;
                         this.router.navigate(['/time-reports'], { queryParams: queryParams });
                       },
                       reason =>{
                         var queryParams = Object.assign({}, this.route.snapshot.queryParams);
                         delete queryParams.report;
                         this.router.navigate(['/time-reports'], { queryParams: queryParams });
                       }
                     );
    }
  }

  /**
   * Submit the filters form and get the resluts
   */
  onListTimeReporsFormSubmit() {
    const formModel = this.listTimeReportsForm.value;

    let queryParams: any = {
      fromDate: this.datepickerParserFormatter.format(formModel.fromDate),
      toDate: this.datepickerParserFormatter.format(formModel.toDate),
    };

    if (formModel.project != 0) {
      queryParams.project = formModel.project;
    }

    if (formModel.profile != 0) {
      queryParams.profile = formModel.profile;
    }

    this.router.navigate(['/time-reports'], {
      queryParams: queryParams
    });
  }

  /**
   * Handle event for deleting time report
   * @param {[type]} timeReport [description]
   */
  onDeleteTimeReport(timeReport: TimeReport) {
    var confirmResponse = confirm('Are you sure that you want to delete this time report?');
    if (confirmResponse) {
      this.timeReportsService.delete(this.user, timeReport.id)
                             .subscribe(
                                response => {
                                  this.timeReports = this.timeReports.filter(function(report) {
                                    return report.id != timeReport.id;
                                  })
                                  this.toastr.success('Your time report has been deleted successfully.', 'Done!', { positionClass: 'toast-bottom-right' })
                                },
                                error => this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' })
                              );
    }
  }

  onEditTimeReport(timeReport: TimeReport) {
    const modalRef = this.modalService.open(AddTimeReportComponent, {
      backdrop: "static",
      size: "lg"
    });
    modalRef.componentInstance.timeReport = timeReport;

    modalRef.result.then(
                     result => this.timeReportsService.refreshTimeReports(result),
                     reason => this.timeReportsService.refreshTimeReports(reason)
                   );
  }

  /**
   * Clear the filters
   */
  onListTimeReporsFormClear() {
    this.fillListTimeReportsForm();
    this.router.navigateByUrl('/time-reports');
  }

  /**
   * Get the stored data in the filters form and request data according to it
   */
  getTimeReportsData() {

    const formModel = this.listTimeReportsForm.value;
    let filters = {
      fromDate: this.datepickerParserFormatter.format(formModel.fromDate),
      toDate: this.datepickerParserFormatter.format(formModel.toDate),
      project: formModel.project,
      profile: formModel.profile,
    };

    this.isLoading.timeReports = true;
    this.isLoading.profilesTimeReports = true;
    this.isLoading.projectsTimeReports = true;

    this.timeReportsService.getTimeReports(this.user, filters)
                           .subscribe(
                              timeReports => {
                                this.timeReports = timeReports;
                                this.isLoading.timeReports = false;
                              },
                              error => this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' })
                            );

    this.timeReportsService.getProfilesTimeReports(this.user, filters)
                           .subscribe(
                              profilesTimeReports => {
                                this.profilesTimeReports = profilesTimeReports;
                                this.isLoading.profilesTimeReports = false;
                              },
                              error => this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' })
                            );

    this.timeReportsService.getProjectsTimeReports(this.user, filters)
                           .subscribe(
                              projectsTimeReports => {
                                this.projectsTimeReports = projectsTimeReports;
                                this.isLoading.projectsTimeReports = false;
                              },
                              error => this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' })
                            );

    this.timeReportsService.getTotalHoursTimeReports(this.user, filters)
                           .subscribe(
                              totalHoursTimeReports => this.totalHoursTimeReports = totalHoursTimeReports,
                              error => this.toastr.error(error, 'Error!', { positionClass: 'toast-bottom-right' })
                            );
  }

  /**
   * Setup the datepickers
   */
  setupDatepickerConfigs() {
    // Setup some datepicker configs
    let dateNow: moment.Moment = moment();
    this.datepickerConfig.maxDate = {
      year: dateNow.year(),
      month: dateNow.month() + 1,
      day: dateNow.date(),
    };
  }

  dateToNgbStruct(dateString?: string) {
    let date: moment.Moment = moment(dateString || '');

    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date()
    }
  }

}
