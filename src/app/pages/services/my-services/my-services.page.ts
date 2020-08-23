import { Component, OnInit } from '@angular/core';
import {MensOutfit} from "../../../models/mens-outfit.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.page.html',
  styleUrls: ['./my-services.page.scss'],
})
export class MyServicesPage implements OnInit {
  pastValue: string;
  outGoingValue: string;
  quantity : number;
  mensOutfits: MensOutfit[] = [];
  isLoading = false;
  private mensOutfitSubscription: Subscription;

  constructor(
      private router: Router,
      private modalController: ModalController,
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {

  }

  ngOnDestroy(): void {
    if (this.mensOutfitSubscription) {
      this.mensOutfitSubscription.unsubscribe();
    }
  }

  onFilterUpdateEvent(filter: string) {
    console.log(filter);
    if (filter === 'past') {
      this.pastValue = filter;
      this.outGoingValue = null;
    } else {
      this.pastValue = null;
      this.outGoingValue = filter;
    }
  }
}
