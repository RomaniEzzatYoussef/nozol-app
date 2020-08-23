import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  user: any;
  imageUrl: string;

  constructor(
      private alertController: AlertController,
      private router: Router,
  ) { }

  ngOnInit() {
    this.imageUrl = 'https://image.freepik.com/free-vector/forgot-password-login-woman-flat-illustration_111797-214.jpg';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    this.showAlert('We have sent a link to your registered Email ID for recover password');
  }

  private showAlert(message: string) {
    this.alertController.create({
      header: 'Done',
      message: message,
      buttons: [{
        text: 'Okay',
        handler: value => {
          // send link to email
          this.router.navigateByUrl('/auth');
        }
      } ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
