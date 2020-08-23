import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookAgainPageRoutingModule } from './book-again-routing.module';

import { BookAgainPage } from './book-again.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookAgainPageRoutingModule,
        ReactiveFormsModule
    ],
    providers: [DatePipe],
    declarations: [BookAgainPage]
})
export class BookAgainPageModule {}
