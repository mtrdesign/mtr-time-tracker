import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { UserService } from './user.service';

import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    SafeHtmlPipe
  ],
  providers: [
    UserService
  ],
  exports:      [
    CommonModule,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
