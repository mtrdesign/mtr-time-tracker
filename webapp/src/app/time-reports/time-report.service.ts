
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';

@Injectable()
export class TimeReportService {
  private createUrl = environment.apiUrl + 'time-reports/';
  private getTimeReportsUrl = environment.apiUrl + 'time-reports/';
  private getProfilesTimeReportsUrl = environment.apiUrl + 'time-reports/profiles/';
  private getProjectsTimeReportsUrl = environment.apiUrl + 'time-reports/projects/';
  private getTotalHoursTimeReportsUrl = environment.apiUrl + 'time-reports/total-hours/';

  constructor (private http: Http) {}

  /**
   * Pass a new serializes time report to the API to save it
   * @param  {User}            user       [description]
   * @param  {TimeReport}      timeReport [description]
   * @return {Observable<any>}            [description]
   */
  create(user: User, timeReport: TimeReport): Observable<any> {
    let apiUrl = this.createUrl;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiUrl, timeReport, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  getTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }


  getProfilesTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getProfilesTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  getProjectsTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getProjectsTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  getTotalHoursTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getTotalHoursTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  // Helper methods

  private prepareRequest(user: User, filters: any) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('date_0', filters.fromDate);
    params.set('date_1', filters.toDate);
    params.set('profile__id', filters.profile != 0 ? filters.profile : '');
    params.set('project__id', filters.project != 0 ? filters.project : '');

    let options = new RequestOptions({
      headers: headers,
      search: params.toString()
    });

    return options;
  }

  /**
   * Extract the body data from the response and serialize it
   * @param {Response} res HttpResponse object
   */
  private extractTimeReportData(res: Response) {
    let body = res.json();

    // let user: User = new User();

    // if (body) {
    //   user.id = body.id;
    //   user.email = body.email_address;
    //   user.firstName = body.first_name;
    //   user.lastName = body.last_name;
    //   user.jobTitle = body.job_title;
    //   user.phoneNumber = body.phone_number;
    // }

    return body || {};
  }

  /**
   * Extract the error message from the response
   * @param {Response | any} error [description]
   */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
