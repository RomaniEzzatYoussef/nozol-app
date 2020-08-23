import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-book-again',
  templateUrl: './book-again.page.html',
  styleUrls: ['./book-again.page.scss'],
})
export class BookAgainPage implements OnInit {
  form: FormGroup;
  currentDate: any;

  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.form = new FormGroup({
      departureDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      returnDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      numberOfRooms: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      numberOfAdult: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      numberOfChildren: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      stayingAt: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onBookAgain() {
    console.log(this.form);
  }
}
