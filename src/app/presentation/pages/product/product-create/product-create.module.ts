import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCreateRoutingModule } from './product-create-routing.module';
import { ProductCreateComponent } from './product-create.component';


@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductCreateRoutingModule
  ]
})
export class ProductCreateModule { }
