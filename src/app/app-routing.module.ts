import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/views/dashboard/dashboard.component';
import { DashboardRoutingModule } from './routes/dashboard/dashboard-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch:'full'
  },
 /*  {
    path: 'dashboard', // (Private) 🚷 Dashboard ...
    component: DashboardComponent,
    //canActivate: [authenticationGuard],

  }, */
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , enableTracing: false}),
  DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
