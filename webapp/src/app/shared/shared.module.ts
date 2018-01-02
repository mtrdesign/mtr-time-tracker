import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { UserService } from './user.service';

import { SafeHtmlPipe } from './safe-html.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    SafeHtmlPipe,
    TruncatePipe,
  ],
  providers: [
    UserService
  ],
  exports:      [
    CommonModule,
    SafeHtmlPipe,
    TruncatePipe,
  ]
})
export class SharedModule { }
