import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryDetailPageRoutingModule } from './category-detail-routing.module';
import { CategoryDetailPage } from './category-detail.page';
import {SignaturePadWrapperComponent} from "../../../../../components/signature-pad-wrapper/signature-pad-wrapper.component";
import {SignaturePadModule} from "angular2-signaturepad";
import {SignaturePadComponent} from "../../../../../components/signature-pad/signature-pad.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryDetailPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [CategoryDetailPage, SignaturePadComponent, SignaturePadWrapperComponent]
})
export class CategoryDetailPageModule {}
