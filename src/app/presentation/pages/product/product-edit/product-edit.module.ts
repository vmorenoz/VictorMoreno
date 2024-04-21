import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './product-edit.component';
import {OrganismsModule} from "@organisms/organisms.module";


@NgModule({
  declarations: [
    ProductEditComponent
  ],
    imports: [
        CommonModule,
        ProductEditRoutingModule,
        OrganismsModule
    ]
})
export class ProductEditModule { }
