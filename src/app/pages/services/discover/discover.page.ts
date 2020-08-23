import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../models/category.model";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  paidCategories: Category[] = [];
  unpaidCategories: Category[] = [];
  isLoading = false;
  private paidCategoriesSubscription: Subscription;
  private unpaidCategoriesSubscription: Subscription;
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.paidCategoriesSubscription = this.categoryService.getPaidCategories().subscribe(categories => {
      this.paidCategories = categories;
      console.log(categories);
    });
    this.unpaidCategoriesSubscription = this.categoryService.getUnPaidCategories().subscribe(categories => {
      this.unpaidCategories = categories;
      console.log(categories);
    });
  }


  ionViewWillEnter() {
    this.isLoading = true;
    this.categoryService.paidCategories.subscribe(() => {
      this.isLoading = false;
    });
    this.categoryService.unpaidCategories.subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.paidCategoriesSubscription) {
      this.paidCategoriesSubscription.unsubscribe();
    }
    if (this.unpaidCategoriesSubscription) {
      this.unpaidCategoriesSubscription.unsubscribe();
    }
  }
}
