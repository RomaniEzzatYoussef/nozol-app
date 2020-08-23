import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyServicesPageRoutingModule } from './my-services-routing.module';

import { MyServicesPage } from './my-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyServicesPageRoutingModule
  ],
  declarations: [MyServicesPage]
})
export class MyServicesPageModule {}
