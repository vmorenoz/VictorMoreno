import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./product-create/product-create.module').then(m => m.ProductCreateModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./product-edit/product-edit.module').then(m => m.ProductEditModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {
}
