import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { ProfileDetailsComponent }    from './profile-details.component';

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
  ]
})
export class ProfileModule {}
