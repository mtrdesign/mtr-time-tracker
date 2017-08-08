import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { User } from './../models/user.model';

import { AuthService } from './auth.service';
import { RootService } from './../core/root.service';

import { environment } from './../../environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  submitted = false;
  errorMessage: any = false;

  config = {
    pageTitle: 'Login',
    env: environment
  };

  constructor (
    private router: Router,
    private rootService: RootService,
    private authService: AuthService,
    private titleService: Title) {

    authService.setCredentials$.subscribe(
                                  user => {
                                    this.successfullLogin(user);
                                  });
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.config.pageTitle} - ${this.config.env.website.title} | ${this.config.env.website.company}`);

    let isUserLogged = this.rootService.isLogged();
    if (isUserLogged) {
      // Check for a saved refeer route
      let redirecrUrl = this.rootService.redirectUrl || '/time-reports';
      this.router.navigate([redirecrUrl]);
    }
  }

  onSubmit() {
    this.submitted = true;

    this.authService.login(this.user)
                    .subscribe(
                      response => {
                        this.user.token = response.token;
                        this.authService.setCredentials(this.user);
                      },
                      error => {
                        this.errorMessage = 'Unable to login with provided credentials.';
                        this.submitted = false;
                      },
                      () => this.submitted = false
                    );
  }

  successfullLogin(user: User) {
    this.rootService.setUser(user);
    this.rootService.rememberMe(user);

    //Check for a saved refeer route
    let redirecrUrl = this.rootService.redirectUrl || '/time-reports';
    this.router.navigate([redirecrUrl]);
  }

}
