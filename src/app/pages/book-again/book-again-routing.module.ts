import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookAgainPage } from './book-again.page';

const routes: Routes = [
  {
    path: '',
    component: BookAgainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAgainPageRoutingModule {}
