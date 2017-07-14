
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

import { User } from './../models/user.model';
import { Project } from './../models/project.model';

@Injectable()
export class ProjectService {
  private getUrl = environment.apiUrl + 'projects/';

  constructor (private http: Http) {}

  getProjects(user: User): Observable<Project[]> {
    let apiUrl = this.getUrl;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiUrl, options)
                    .map(this.extractProjectsData)
                    .catch(this.handleError);
  }

  // Helper methods

  /**
   * Extract the body data from the response and serialize it
   * @param {Response} res HttpResponse object
   */
  private extractProjectsData(res: Response) {
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
