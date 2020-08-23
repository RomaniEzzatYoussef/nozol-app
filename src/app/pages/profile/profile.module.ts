import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {ImagePickerComponent} from "../../components/image-picker/image-picker.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        ImagePickerComponent
    ],
    declarations: [ProfilePage, ImagePickerComponent]
})
export class ProfilePageModule {}
