import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceCategoryDetailPageRoutingModule } from './service-category-detail-routing.module';

import { ServiceCategoryDetailPage } from './service-category-detail.page';
import {StarRatingModule} from "ionic5-star-rating";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ServiceCategoryDetailPageRoutingModule,
        StarRatingModule
    ],
  declarations: [ServiceCategoryDetailPage]
})
export class ServiceCategoryDetailPageModule {}
