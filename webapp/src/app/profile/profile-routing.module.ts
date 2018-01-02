import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileDetailsComponent }    from './profile-details.component';

import { AuthGuard }                from './../guards/auth-guard.service';

const profileRoutes: Routes = [
  { path: 'profile', canActivate: [AuthGuard], component: ProfileDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
