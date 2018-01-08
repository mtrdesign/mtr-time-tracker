import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from './../models/user.model';

@Injectable()
export class RootService {

  // Details about the logged user are stored here
  user: User = null;
  userChange: Subject<User> = new Subject<User>();

  // Keep the referer route when the user is not logged
  redirectUrl: string;

  constructor()  {
    this.userChange.subscribe(user => {
      this.user = user;
    });
  }

  /**
   * Set a new user value, probably after successfull login
   * Emits a change event so you can subscribe for changes
   * @param {User} user
   */
  setUser(user: User) {
    //this.user = user;
    this.userChange.next(user);
  }

  /**
   * Keep the user details in the localStorage
   * @param {User} user
   */
  rememberMe(user: User) {
    user.date_logged = new Date();
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLogged(): any {
    if (localStorage.getItem('user')) {
      var user = JSON.parse(localStorage.getItem('user'));

      if (user.remember) {
        return user;
      }

      var date = new Date();
      var userDateLogged = new Date(user.date_logged)
      var sessionLife = 60 * 60 * 1000;

      if (date.getTime() - userDateLogged.getTime() < sessionLife) {
        return user;
      }

      return false;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.setUser(null);
  }

}
