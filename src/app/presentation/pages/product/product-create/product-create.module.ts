import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCreateRoutingModule } from './product-create-routing.module';
import { ProductCreateComponent } from './product-create.component';
import {OrganismsModule} from "@organisms/organisms.module";
import {TemplatesModule} from "@templates/templates.module";


@NgModule({
  declarations: [
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductCreateRoutingModule,
    OrganismsModule,
    TemplatesModule
  ]
})
export class ProductCreateModule { }
