import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NgChartsModule } from 'ng2-charts';

// Keycloak: Authentication & Authorization
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/', // Port asigned in the docker
        realm: 'inventory',
        clientId: 'angular-client' // / Client Id asigned in the Keycloak
      },
      initOptions: {
        onLoad: 'login-required',
        flow: "standard",
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true // Obtiene la información del usuario logueado(profile)
    });
}

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
    KeycloakAngularModule,
    NgChartsModule

  ],
  providers: [
    ...application,
    ...infrastructure,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
