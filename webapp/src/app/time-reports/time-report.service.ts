
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

  // Helper methods

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
