import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {
  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      cleaniness: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      wifi: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      roomService: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      comfort: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      staff: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      comments: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onCheckOut() {
    console.log(this.form);
    this.router.navigateByUrl('/book-again')
  }

  onCleaninessChange(cleaniness: number) {
    this.form.patchValue({cleaniness: cleaniness})
  }

  onWifiChange(wifi: number) {
    this.form.patchValue({wifi: wifi})
  }

  onLocationChange(location: number) {
    this.form.patchValue({location: location})
  }

  onRoomServiceChange(roomService: number) {
    this.form.patchValue({roomService: roomService})
  }

  onComfortChange(comfort: number) {
    this.form.patchValue({comfort: comfort})
  }

  onStaffChange(staff: number) {
    this.form.patchValue({staff: staff})
  }
}
