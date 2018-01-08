
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

import { User } from './../models/user.model';

@Injectable()
export class UserService {
  private getUrl = environment.apiUrl + 'profiles/';
  private updateUrl = environment.apiUrl + 'profiles/';
  private setPasswordUrl = environment.apiUrl + 'users/:id/set_password/';
  private getProfilesUrl = environment.apiUrl + 'profiles/';

  constructor (private http: Http) {}

  /**
   * Get User details from the API
   * @param  {User}             user [description]
   * @return {Observable<User>}      [description]
   */
  getUser(user: User): Observable<User> {
    let apiUrl = this.getUrl + user.id + '/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiUrl, options)
                    .map(this.extractUserData)
                    .catch(this.handleError);
  }

  /**
   * Get User details from the API
   * @param  {User}             user [description]
   * @return {Observable<User>}      [description]
   */
  getUserProfile(user: User): Observable<User> {
    let apiUrl = this.getUrl + '?user__id=' + user.id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiUrl, options)
                    .map(this.extractUserData)
                    .catch(this.handleError);
  }

  /**
   * Pass a request to the API to update the user details
   * @param  {User}             user
   * @return {Observable<User>}
   */
  updateUser(user: User): Observable<User> {
    let apiUrl = this.updateUrl + user.id + '/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(apiUrl, this.packData(user), options)
                    .map(this.extractUserData)
                    .catch(this.handleError);
  }

  /**
   * Get User profiles from the API
   * @param  {User}             user [description]
   * @return {Observable<User>}      [description]
   */
  getProfiles(user: User): Observable<Array<User>> {
    let apiUrl = this.getProfilesUrl;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(apiUrl, options)
                    .map(this.extractProfilesData)
                    .catch(this.handleError);
  }

  /**
   * Pass a request to reset user's pasword to the API
   * @param  {User}            user [description]
   * @param  {any}             data [description]
   * @return {Observable<any>}      [description]
   */
  setPassword(user: User, data: any): Observable<any> {
    let apiUrl = this.setPasswordUrl.replace(/:id/g, String(user.id));
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + user.token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiUrl, data, options)
                    .map(this.extrcatPasswordData)
                    .catch(this.handleError);
  }

  // Helper methods

  /**
   * Extract the body data from the response and serialize it
   * @param {Response} res HttpResponse object
   */
  private extractUserData(res: Response) {
    let body = res.json();
    let user: User = new User();
    let data = body[0] ? body[0] : body;

    if (data) {
      user.id = data.id;
      user.email = data.email_address;
      user.firstName = data.first_name;
      user.lastName = data.last_name;
      user.jobTitle = data.job_title;
      user.phoneNumber = data.phone_number;

      user.user_entry = {
        id: data.user_entry.id,
        is_superuser: data.user_entry.is_superuser
      }
    }

    return user;
  }

  private extractProfilesData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private extrcatPasswordData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Serialize the data for the Server API
   * @param {User} user [description]
   */
  private packData(user: User) {
    return {
      email_address: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      job_title: user.jobTitle,
      phone_number: user.phoneNumber
    }
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
      errMsg = `${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    if (errMsg === '{"isTrusted":true}') {
      return Observable.throw('Could\'t fetch Profiles data from the server.');
    }
    return Observable.throw(errMsg);
  }
}
