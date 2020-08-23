import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceCategory} from "../../../../models/service-category.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, NavController} from "@ionic/angular";
import {AuthService} from "../../../../services/auth/auth.service";
import {CategoryService} from "../../../../services/category/category.service";
import {Category} from "../../../../models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-service-category-detail',
  templateUrl: './service-category-detail.page.html',
  styleUrls: ['./service-category-detail.page.scss'],
})
export class ServiceCategoryDetailPage implements OnInit, OnDestroy {
  category: Category;
  categoryServices: ServiceCategory[] = [];
  private serviceCategoriesSubscription: Subscription;

  isLoading = false;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private navController: NavController,
      private categoryService: CategoryService,
      private authService: AuthService,
      private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('categoryId')) {
        this.navController.navigateBack('/services/tabs/discover');
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;

      this.serviceCategoriesSubscription = this.categoryService.getCategoryServicesByCategoryId(+paramMap.get('categoryId')).subscribe(categoryServices => {
        this.categoryServices = categoryServices;
        console.log(categoryServices);
      });

      return this.categoryService.getCategory(+paramMap.get('categoryId')).subscribe(category => {
        this.category = category;
        console.log(category);
        this.isLoading = false;
      }, error => {
        this.alertController.create({
          header: 'An error ocurred! ' ,
          message: 'Could not load category.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/services/tabs/discover']);
              }
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.categoryService.category.subscribe(() => {
      this.isLoading = false;
    });
    this.categoryService.categoryServices.subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.serviceCategoriesSubscription) {
      this.serviceCategoriesSubscription.unsubscribe();
    }
  }

}
