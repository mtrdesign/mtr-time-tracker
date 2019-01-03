
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

import { User } from './../models/user.model';
import { TimeReport } from './../models/time-report.model';

@Injectable()
export class TimeReportService {
  private getUrl = environment.apiUrl + 'time-reports/';
  private createUrl = environment.apiUrl + 'time-reports/';
  private updateUrl = environment.apiUrl + 'time-reports/';
  private deleteUrl = environment.apiUrl + 'time-reports/';
  private getTimeReportsUrl = environment.apiUrl + 'time-reports/';
  private getProfilesTimeReportsUrl = environment.apiUrl + 'time-reports/profiles/';
  private getProjectsTimeReportsUrl = environment.apiUrl + 'time-reports/projects/';
  private getTotalHoursTimeReportsUrl = environment.apiUrl + 'time-reports/total-hours/';

  private refreshTimeReportsSource = new Subject<boolean>();
  refreshTimeReportsSource$ = this.refreshTimeReportsSource.asObservable();

  constructor (private http: Http) {}

  /**
   * Get a single time report by its id
   * @param  {User}            user         [description]
   * @param  {number}          timeReportId [description]
   * @return {Observable<any>}              [description]
   */
  get(user: User, timeReportId: number): Observable<any> {
    let apiUrl = this.getUrl + timeReportId + '/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

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

  /**
   * Pass an id of a time report and the new object to the API to update it
   * @param  {User}            user       [description]
   * @param  {timeReport}      timeReport [description]
   * @return {Observable<any>}            [description]
   */
  update(user: User, timeReport: TimeReport): Observable<any> {
    let apiUrl = this.updateUrl + timeReport.id + '/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(apiUrl, timeReport, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  /**
   * Pass an id of a time report to the API to delete it
   * @param  {User}            user         [description]
   * @param  {number}          timeReportId [description]
   * @return {Observable<any>}              [description]
   */
  delete(user: User, timeReportId: number): Observable<any> {
    let apiUrl = this.deleteUrl + timeReportId + '/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  /**
   * Get a list with all time reports
   * @param  {User}            user    [description]
   * @param  {any}             filters [description]
   * @return {Observable<any>}         [description]
   */
  getTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  /**
   * Get a list with all time reports groupped by profiles
   * @param  {User}            user    [description]
   * @param  {any}             filters [description]
   * @return {Observable<any>}         [description]
   */
  getProfilesTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getProfilesTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  /**
   * Get a list with all time reports groupped by project
   * @param  {User}            user    [description]
   * @param  {any}             filters [description]
   * @return {Observable<any>}         [description]
   */
  getProjectsTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getProjectsTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  /**
   * Get the total hours for the time reports
   * @param  {User}            user    [description]
   * @param  {any}             filters [description]
   * @return {Observable<any>}         [description]
   */
  getTotalHoursTimeReports(user: User, filters: any): Observable<any> {
    let apiUrl = this.getTotalHoursTimeReportsUrl;
    let options = this.prepareRequest(user, filters);

    return this.http.get(apiUrl, options)
                    .map(this.extractTimeReportData)
                    .catch(this.handleError);
  }

  // Observable Streams

  /**
   * Listen for changes which should trigger refresh of the reports
   * @param {boolean} isReadyForRefresh [description]
   */
  refreshTimeReports(isReadyForRefresh: boolean) {
    if (isReadyForRefresh) {
      this.refreshTimeReportsSource.next(isReadyForRefresh);
    }
  }

  // Helper methods

  private prepareRequest(user: User, filters: any) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('date_after', filters.fromDate);
    params.set('date_before', filters.toDate);
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

    return body || {};
  }

  /**
   * Extract the error message from the response
   * @param {Response | any} error [description]
   */
  private handleError (error: Response | any) {
    console.error(error);

    if (error.status === 0) {
      return Observable.throw('Could\'t establish a conenction with the server.');
    }

    let errMsg: string = '';
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log(body);
        console.log('Array');
        for(var errIndex in body) {
          body[errIndex].forEach(function(errorMessage) {
            errMsg += errorMessage + '<br>';
          });
        }
      // else {
      //   console.log('Not array');
      //   errMsg += body.detail;
      // }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
