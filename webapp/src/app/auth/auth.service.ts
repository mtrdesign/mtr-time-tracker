
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

import { User } from './../models/user.model';

@Injectable()
export class AuthService {
  private loginUrl = environment.apiUrl + 'auth/jwt/new/';
  private verifyTokenUrl = environment.apiUrl + 'auth/jwt/verify/';

  private _setCredentials = new Subject<User>();
  setCredentials$ = this._setCredentials.asObservable();

  jwtHelper: JwtHelper = new JwtHelper();

  constructor (
    private http: Http,
    private authHttp: AuthHttp) {}

  /**
   * Send credentials to the server to authenticate the user
   * @param {User} user
   */
  login(user: User): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, user, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setCredentials(user: User) {
    this.verifyToken(user)
        .subscribe(
          response => {
            var decodedToken = this.jwtHelper.decodeToken(response.token);

            user.id = decodedToken.user_id;
            user.email = decodedToken.email;

            this._setCredentials.next(user);
          },
          error => {
            console.error(error);
        });
  }

  verifyToken(user: User): Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.verifyTokenUrl, { token: user.token }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Helper methods

  /**
   * Extract the body data from the response
   * @param {Response} res HttpResponse object
   */
  private extractData(res: Response) {
    let body = res.json();
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
      errMsg = `${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    if (errMsg === '{"isTrusted":true}') {
      return Observable.throw('Couldn\'t establish a connection to the server.');
    }
    return Observable.throw(errMsg);
  }
}
