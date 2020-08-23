import {Component, OnDestroy, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Subscription} from "rxjs";
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {AppState, Capacitor, Plugins} from "@capacitor/core";
import {take} from "rxjs/operators";
import {User} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  private previousAuthState = false;
  user: User;

  constructor(
      private platform: Platform,
      // private splashScreen: SplashScreen,
      // private statusBar: StatusBar,
      private authService: AuthService,
      private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
          .autoLogin()
          .pipe(take(1))
          .subscribe(success => {
            if (!success) {
              this.onLogout();
            }
          });
    }
  }

  ngOnInit(): void {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
    Plugins.App.addListener('appStateChange', this.checkAuthOnResume.bind(this));

  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
