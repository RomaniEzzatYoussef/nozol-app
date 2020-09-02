import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {User} from "../../models/user.model";

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
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
    form: FormGroup;
    user: User;
    selectedImage: any;
    isLoading = false;
    imageId: number = 1;
    private imageSubscription: Subscription;
    private userSubscription: Subscription;

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private alertController: AlertController,
        private userService: UserService,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            phone: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(12)]
            }),
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            image: new FormControl(null)
        });

        this.isLoading = true;
        this.userSubscription = this.userService.getCurrentUser().subscribe(user => {
           this.user = user;
           console.log(this.user);
            this.form = new FormGroup({
                name: new FormControl(this.user.name, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                }),
                phone: new FormControl(this.user.phone, {
                    updateOn: 'blur',
                    validators: [Validators.required, Validators.maxLength(12)]
                }),
                email: new FormControl(this.user.email, {
                    updateOn: 'blur',
                    validators: [Validators.required, Validators.email]
                }),
                image: new FormControl(this.user.image)
            });

            this.imageSubscription = this.userService.getImage(this.user.image.id).subscribe(image => {
                const base64Data = image.imageByte;
                this.selectedImage = 'data:image/jpeg;base64,' + base64Data;
                // console.log(this.selectedImage);
            });

            this.isLoading = false;
        }, error => {
            this.alertController.create({
                header: 'An error occurred',
                message: 'Place could not be fetched. Please try again later.',
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                            this.router.navigate(['/places/tabs/offers']);
                        }
                    }
                ]
            }).then(alertEl => {
                alertEl.present();
            });
        });
    }


    ionViewWillEnter() {
        this.isLoading = true;
        this.userService.image.subscribe(() => {
            this.isLoading = false;
        });
        this.isLoading = true;
        this.userService.user.subscribe(() => {
            this.isLoading = false;
        });
    }

    onImagePicked(imageData: string | File) {
        let imagePickedFile;
        if (typeof imageData === 'string') {
            try {
                imagePickedFile = base64toBlob(imageData.replace('data:image/png;base64,', ''), 'image/jpeg');
            } catch (error) {
                console.log(error);
                return;
            }
        } else {
            imagePickedFile = imageData;
        }
        this.form.patchValue({image: imagePickedFile});
    }

    onSubmit() {
        // if (!this.form.valid || !this.form.get('image').value) {
        //   return;
        // }
        console.log(this.form.get('image').value);
        this.loadingController
            .create({
                message: 'update Profile...'
            })
            .then(loadingEl => {
                loadingEl.present();
                this.userService.uploadImage(this.form.get('image').value)
                    .subscribe((response) => {
                        let message;
                        if (response.status === 200) {
                            message = 'Image uploaded successfully';
                        } else {
                            message = 'Image not uploaded successfully';
                        }
                        console.log(message);
                        loadingEl.dismiss();
                        this.form.reset();
                        this.router.navigateByUrl('/services/tabs/discover')
                    });
            });
    }

    ngOnDestroy(): void {
        if (this.imageSubscription) {
            this.imageSubscription.unsubscribe();
        }
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

}
