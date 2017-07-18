import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { UserService } from './user.service'

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    //UserService
  ],
  providers: [
    UserService
  ],
  exports:      [
    CommonModule,
  ]
})
export class SharedModule { }
