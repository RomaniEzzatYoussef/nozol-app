import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckOutPageRoutingModule } from './check-out-routing.module';
import { CheckOutPage } from './check-out.page';
import {StarRatingModule} from "ionic5-star-rating";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CheckOutPageRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        StarRatingModule
    ],
    declarations: [CheckOutPage]
})
export class CheckOutPageModule {}
