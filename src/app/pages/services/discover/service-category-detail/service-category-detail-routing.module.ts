import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCategoryDetailPage } from './service-category-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCategoryDetailPage
  },
  {
    path: 'categories/:categoryServiceId',
    loadChildren: () => import('./category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCategoryDetailPageRoutingModule {}
