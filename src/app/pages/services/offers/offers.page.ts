import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -100,
  };

  constructor() { }

  ngOnInit() {
  }

}
