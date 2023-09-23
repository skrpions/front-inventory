import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './routes/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryApplication } from './routes/categories/application/category-application';
import { CategoryInfrastructure } from './routes/categories/infrastructure/category-infrastructure';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProductApplication } from './routes/products/application/product-application';
import { ProductInfrastructure } from './routes/products/infrastructure/product-infrastructure';

// Declaron constantes para los providers
const application = [
  CategoryApplication,
  ProductApplication
];
const infrastructure = [
  CategoryInfrastructure,
  ProductInfrastructure
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    ...application,
    ...infrastructure,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
