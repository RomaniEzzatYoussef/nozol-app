import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckInPageRoutingModule } from './check-in-routing.module';
import { CheckInPage } from './check-in.page';
import {ProfilePageModule} from "../profile/profile.module";
import {SignaturePadComponent} from "../../components/signature-pad/signature-pad.component";
import {SignaturePadModule} from "angular2-signaturepad";
import {FileUploadComponent} from "../../components/file-upload/file-upload.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CheckInPageRoutingModule,
    ProfilePageModule,
    SignaturePadModule
  ],
  providers: [DatePipe],
  declarations: [CheckInPage, SignaturePadComponent, FileUploadComponent]
})
export class CheckInPageModule {}
