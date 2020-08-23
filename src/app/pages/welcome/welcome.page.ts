import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.router.navigate(['auth']);
  }

  ngOnDestroy(): void {

  }
}
