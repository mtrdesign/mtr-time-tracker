import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

import { PageNotFoundComponent }    from './not-found.component';

import { RootService }    from './root.service';

import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports:      [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [ PageNotFoundComponent ],
  exports:      [ PageNotFoundComponent ],
  providers:    [ RootService ]
})
export class CoreModule { }
