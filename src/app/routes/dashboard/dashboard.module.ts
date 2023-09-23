import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CategoriesModule,
    ProductsModule
  ]
})
export class DashboardModule { }
