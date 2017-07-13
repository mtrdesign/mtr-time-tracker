import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { ProfileDetailsComponent }    from './profile-details.component';

import { UserService }    from './user.service';

import { AuthGuard }                from './../guards/auth-guard.service';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileDetailsComponent,
  ],
  providers: [
    AuthGuard,

    UserService,
  ]
})
export class ProfileModule {}
