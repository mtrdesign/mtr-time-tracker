import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { RootService }      from './../core/root.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private rootService: RootService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  /**
   * Check for a logged user
   * If the user is logged enable to proceed forward
   * If the user is not logged, keep the referer url and redirect to the login route
   * @param  {string}  url referer route
   * @return {boolean}     the state of the user - logged/not logged
   */
  checkLogin(url: string): boolean {
    if (this.rootService.user) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.rootService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
