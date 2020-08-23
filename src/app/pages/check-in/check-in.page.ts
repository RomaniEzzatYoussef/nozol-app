import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {LoadingController} from "@ionic/angular";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, {type: contentType});
}

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  form: FormGroup;
  currentDate;

  constructor(
      private datePipe: DatePipe,
      private loadingController: LoadingController,
  ) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      familyName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      checkInDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      checkOutDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      bookingWay: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      travelAgent: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      website: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      fullAddress: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      job: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateOfBirth: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      wifeName: new FormControl(null, {
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
      numberOfRooms: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      paymentMethod: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      idProofType: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      idProof: new FormControl(null, {
        updateOn: 'blur'
      }),
      signature: new FormControl(null, {
        updateOn: 'blur'
      }),
    });

  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({image: imageFile});
  }

  onCheckIn() {
    console.log(this.form);
    this.loadingController.create({keyboardClose: true, message: 'Wait until you get Approval...'})
        .then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            loadingEl.dismiss();
          }, 5000);
        });
  }

}
