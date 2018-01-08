import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbActiveModal, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { RootService } from './../core/root.service';
import { ProjectService } from './project.service';
import { TimeReportService } from './time-report.service';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';
import { Project } from './../models/project.model';

@Component({
  templateUrl: './add-time-report.component.html',
  styleUrls: ['./add-time-report.component.css'],
  providers: [ NgbDatepickerConfig ]
})
export class AddTimeReportComponent implements AfterViewInit {

  @Input() timeReport;
  @Input() project;

  addTimeReportForm: FormGroup;
  projectSelected: any;
  user: User;
  projects: Array<Project> = [];
  isChanged = false;

  // String messages containing the form submission results
  addTimeReportFormSuccessMessage: string;
  addTimeReportFormErrorMessage: string;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private rootService: RootService,
    private projectService: ProjectService,
    private timeReportsService: TimeReportService,
    private datepickerConfig: NgbDatepickerConfig) {

    this.createAddTimeReportForm();
    this.setupDatepickerConfigs();
  }

  /**
   * Build the Add Time Report form and setup some validation rules
   */
  createAddTimeReportForm() {
    this.addTimeReportForm = this.fb.group({
      id: '',
      project: [0, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      hours: ['', [Validators.required, Validators.pattern(/(|)(\d|\d{1}:\d{2}|\d{2}:\d{2})/)]],
      description: '',
      date: ['', Validators.required],
    });
  }

  fillAddTimeReportsForm(isReset?: boolean) {
    isReset = isReset || false;
    let dateNow: moment.Moment = moment();

    this.addTimeReportForm.patchValue({
      project: 0,
      date: { year: dateNow.year(), month: dateNow.month()+1, day: dateNow.date()}
    });

    if (this.project !== undefined && this.timeReport === undefined) {
      this.addTimeReportForm.patchValue({
        project: this.project,
      });
    }

    if (this.timeReport !== undefined && !isReset) {
      let timeReportDate: moment.Moment = moment(this.timeReport.date);

      this.addTimeReportForm.setValue({
        id: this.timeReport.id,
        project: this.timeReport.project,
        date: { year: timeReportDate.year(), month: timeReportDate.month()+1, day: timeReportDate.date()},
        name: this.timeReport.name,
        hours: this.timeReport.hours,
        description: this.timeReport.description
      });
    }
  }

  ngAfterViewInit() {
    this.user = this.rootService.user;

    this.projectService.getProjects(this.user)
                       .subscribe(
                         projects => {
                           this.projects = projects;
                           this.fillAddTimeReportsForm();
                         },
                         error => console.log(error)
                       );

    // /this.fillAddTimeReportsForm();
  }

  onAddTimeReportFormSubmit() {
    this.addTimeReportFormErrorMessage = '';
    let timeReport: TimeReport = this.prepareSaveTimeReport(this.user);
    let timeReportsServiceAction = timeReport.id ? this.timeReportsService.update(this.user, timeReport) : this.timeReportsService.create(this.user, timeReport);

    timeReportsServiceAction.subscribe(
                              response => {
                                if (response.id) {
                                  this.isChanged = true;
                                  this.addTimeReportFormSuccessMessage = 'Your Time Report has been successfully saved.';
                                  setTimeout(() => this.addTimeReportFormSuccessMessage = '', 3000);

                                  if (typeof timeReport.id !== 'number') {
                                    this.addTimeReportForm.reset();
                                    this.fillAddTimeReportsForm(true);;
                                  }
                                }
                                else {
                                  this.addTimeReportFormErrorMessage = 'An error has occured while saving your Time Report. PLease try again or contact the developers team.';
                                }
                              },
                              error => {
                                console.error(error);
                                this.addTimeReportFormErrorMessage = error
                              }
                            );
  }

    /**
   * Get the entered data in the form and serialize it as a TimeReport object, ready to pass it to the TimeReportsService
   * Returns new `User` object containing a combination of original user value(s) and deep copies of changed form model values
   * @param  {User} user
   * @return {TimeReport}
   */
  prepareSaveTimeReport(user: User): TimeReport {
    const formModel = this.addTimeReportForm.value;

    var seconds: number = 0;
    if (moment.duration(formModel.hours).asSeconds()) {
      seconds = moment.duration(formModel.hours).asSeconds();
    } else {
      seconds = moment.duration({'hours': formModel.hours}).asSeconds();
    }

    var date = formModel.date.year + '-' + formModel.date.month + '-' + formModel.date.day;

    var saveTimeReport: TimeReport = {
      id: formModel.id as number,
      project: formModel.project as number,
      profile: this.timeReport === undefined ? (user.id as number) : (this.timeReport.profile as number),

      name: formModel.name as string,
      seconds: seconds as number,
      description: formModel.description as string,
      date: date as string,
    };

    return saveTimeReport;
  }

  setupDatepickerConfigs() {
    // Setup some datepicker configs
    let dateNow: moment.Moment = moment();
    this.datepickerConfig.maxDate = {
      year: dateNow.year(),
      month: dateNow.month() + 1,
      day: dateNow.date(),
    };
  }

  /**
   * Dismiss the modal and pass info about the changes which were made
   */
  dismiss() {
    this.activeModal.dismiss(this.isChanged);
  }

  /**
   * Close the modal and pass info about the changes which were made
   */
  close() {
    this.activeModal.close(this.isChanged);
  }

}
