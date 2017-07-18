
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

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
    private datepickerConfig: NgbDatepickerConfig) {

    this.createListTimeReportsForm();
    this.setupDatepickerConfigs();
  }

  ngOnInit() {
    this.user = this.rootService.user;

    this.projectService.getProjects(this.user)
                       .subscribe(
                          projects => this.projects = projects,
                          error => console.log(error)
                        );

    this.userService.getProfiles(this.user)
                    .subscribe(
                      profiles => this.profiles = profiles,
                      error => console.log(error)
                    );

    this.fillListTimeReportsForm();
    this.getTimeReportsData();
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
    let dateNow: moment.Moment = moment();
    this.listTimeReportsForm.patchValue({
      project: 0,
      profile: 0,
      fromDate: { year: dateNow.year(), month: dateNow.month()+1, day: 1 },
      toDate: { year: dateNow.year(), month: dateNow.month()+1, day: dateNow.date() }
    });
  }

  /**
   * Submit the filters form and get the resluts
   */
  onListTimeReporsFormSubmit() {
    this.getTimeReportsData();
  }

  getTimeReportsData() {
    const formModel = this.listTimeReportsForm.value;
    let filters = {
      fromDate: formModel.fromDate.year + '-' + formModel.fromDate.month + '-' + formModel.fromDate.day,
      toDate: formModel.toDate.year + '-' + formModel.toDate.month + '-' + formModel.toDate.day,
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

}
