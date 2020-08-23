import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {SignaturePadWrapperComponent} from "../../../../../components/signature-pad-wrapper/signature-pad-wrapper.component";
import {Service} from "../../../../../models/service.model";
import {CategoryService} from "../../../../../services/category/category.service";

@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.page.html',
    styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit, OnDestroy {
    services: Service[] = [];
    quantity: number = 0;
    isLoading = false;
    categoryServiceTitle: string;
    private servicesSubscription: Subscription;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private navController: NavController,
        private route: ActivatedRoute,
        private modalController: ModalController,
        private alertController: AlertController,
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('categoryServiceId')) {
                this.navController.navigateBack('/services/tabs/discover');
                return;
            }
            this.categoryServiceTitle = this.route.snapshot.queryParamMap.get('categoryServiceTitle');

            this.isLoading = true;
            this.servicesSubscription = this.categoryService.getServicesByCategoryServiceId(+paramMap.get('categoryServiceId')).subscribe(services => {
                this.isLoading = false;
                this.services = services;
            });

        }, error => {
            this.alertController.create({
                header: 'An error ocurred! ',
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
    }


    ionViewWillEnter() {
        this.isLoading = true;
        this.servicesSubscription = this.categoryService.services.subscribe(services => {
            this.isLoading = false;
            this.services = services;
            console.log(services);
        });
    }

    ngOnDestroy() {
        if (this.servicesSubscription) {
            this.servicesSubscription.unsubscribe();
        }
    }

    onConfirm() {
        this.modalController.create({
            component: SignaturePadWrapperComponent,
        })
            .then(modalEl => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then(resultData => {
                if (resultData.role === 'cancel') {
                    console.log('cancel');
                } else {
                    console.log(resultData);
                }
            });

    }

    quantityUp() {
        this.quantity = +this.quantity + 1;
    }

    quantityDown() {
        this.quantity = +this.quantity - 1;
    }
}
