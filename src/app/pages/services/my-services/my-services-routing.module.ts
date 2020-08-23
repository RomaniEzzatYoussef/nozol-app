import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyServicesPage } from './my-services.page';

const routes: Routes = [
  {
    path: '',
    component: MyServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyServicesPageRoutingModule {}
