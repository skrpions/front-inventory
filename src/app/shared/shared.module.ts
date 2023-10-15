import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UploadDirective } from './directives/upload.directive';
import { WebcamModule } from 'ngx-webcam';

const COMPONENTS: any[] = [
  SidenavComponent,
  ConfirmComponent,
  PhotoComponent
];

const DIRECTIVES: any[] = [
  UploadDirective
];



const MODULES: any[] = [
  CommonModule,
  MaterialModule,
  RouterModule,
  WebcamModule,
];



@NgModule({
  declarations: [
    ...COMPONENTS, ...DIRECTIVES

  ],
  imports: [
    ...MODULES
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class SharedModule { }
