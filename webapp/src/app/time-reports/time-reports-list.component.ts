
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/forkJoin';

import { RootService } from './../core/root.service';
import { ProjectService } from './project.service';
import { TimeReportService } from './time-report.service';
import { UserService } from './../shared/user.service';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';
import { Project } from './../models/project.model';

@Component({
  templateUrl: './time-reports-list.component.html',
  styleUrls: ['./time-reports-list.component.css']
})
export class TimeReportsListComponent implements OnInit {

  listTimeReportsForm: FormGroup;
  user: User;
  timeReports: Array<TimeReport> = [];
  profilesTimeReports: Array<TimeReport> = [];
  projectsTimeReports: Array<TimeReport> = [];
  totalHoursTimeReports = null;
  profiles: Array<User> = [];
  projects: Array<Project> = [];


  constructor(
    private rootService: RootService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private timeReportsService: TimeReportService,
    private datepickerConfig: NgbDatepickerConfig,
    private datepickerParserFormatter: NgbDateParserFormatter,
    private router: Router,
    private route: ActivatedRoute) {

    this.createListTimeReportsForm();
    this.setupDatepickerConfigs();
  }

  ngOnInit() {
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
                error => console.log(error)
              );

    // Subscribe for new changes of the query params
    this.router.events.filter(e => e instanceof NavigationEnd)
                      .forEach(e => {
                        let params = this.route.snapshot.queryParams;
                        this.handleQueryParamsFilters(params);
                      });
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

    this.getTimeReportsData();
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

    this.timeReportsService.getTimeReports(this.user, filters)
                           .subscribe(
                              timeReports => this.timeReports = timeReports,
                              error => console.log(error)
                            );

    this.timeReportsService.getProfilesTimeReports(this.user, filters)
                           .subscribe(
                              profilesTimeReports => this.profilesTimeReports = profilesTimeReports,
                              error => console.log(error)
                            );

    this.timeReportsService.getProjectsTimeReports(this.user, filters)
                           .subscribe(
                              projectsTimeReports => this.projectsTimeReports = projectsTimeReports,
                              error => console.log(error)
                            );

    this.timeReportsService.getTotalHoursTimeReports(this.user, filters)
                           .subscribe(
                              totalHoursTimeReports => this.totalHoursTimeReports = totalHoursTimeReports,
                              error => console.log(error)
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
