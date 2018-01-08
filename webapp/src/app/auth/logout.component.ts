import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../models/user.model';

import { AuthService } from './auth.service';
import { RootService } from './../core/root.service';

@Component({
  template: 'Logout..',
})
export class LogoutComponent implements OnInit {

  constructor (
    private router: Router,
    private rootService: RootService,
    private authService: AuthService) {}

  ngOnInit() {
    this.rootService.logout();
    this.router.navigate(['/login']);
  }

}
