import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const COMPONENTS: any[] = [
  SidenavComponent
];

const MODULES: any[] = [
  CommonModule,
  MaterialModule,
  RouterModule
];



@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class SharedModule { }
