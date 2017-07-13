import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

//import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/time-reports', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
