import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {CountryCode} from "../../models/country-codes.model";

interface UserData {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLogin = true;
    user: any;
    country_codes: any = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingController: LoadingController,
        private alertController: AlertController,
    ) {
    }

    ngOnInit() {
        this.country_codes = CountryCode.countries;
    }

    login(email: string, password: string) {
        this.isLoading = true;
        this.loadingController.create({keyboardClose: true, message: 'Logging in...'})
            .then(loadingEl => {
                loadingEl.present();
                this.authService.login(email, password)
                    .subscribe(resData => {
                        console.log(resData);
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.router.navigateByUrl('/services/tabs/discover');
                    }, errorResponse => {
                        console.log(errorResponse);
                        loadingEl.dismiss();
                        const code = errorResponse.error.error_description;
                        let message = 'Could not sign you in, Please try again.';
                        if (code === 'EMAIL_NOT_FOUND') {
                            message = 'E-Mail address could not be found.';
                        } else if (code === 'Bad credentials') {
                            message = 'This password is not correct.';
                        }
                        this.showAlert(message);
                    });

            });
    }

    signUp(name: string, email: string, password: string, phone: string, gender: string) {
        this.isLoading = true;
        this.loadingController.create({keyboardClose: true, message: 'Signing up...'})
            .then(loadingEl => {
                loadingEl.present();
                this.authService.signup(name, email, password, phone, gender)
                    .subscribe(resData => {
                        console.log(resData);
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.login(email, password);
                    }, errorResponse => {
                        console.log(errorResponse);
                        loadingEl.dismiss();
                        const code = errorResponse.error.message;
                        let message = 'Could not sign you up, Please try again.';
                        if (code === 'EMAIL_EXISTS') {
                            message = 'This email address exists already!';
                        } else {
                            message = code;
                        }
                        this.showAlert(message);
                    });
            });
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const name = form.value.name;
        const email = form.value.email;
        const gender = form.value.gender;
        const phone = form.value.phone;
        const password = form.value.password;
        if (this.isLogin) {
            this.login(email, password)
            form.reset();
        } else {
            this.signUp(name, email, password, phone, gender);
            form.reset();
        }

    }

    private showAlert(message: string) {
        this.alertController.create({
            header: 'Authentication failed',
            message: message,
            buttons: ['Okay']
        }).then(alertEl => {
            alertEl.present();
        });
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }
}
