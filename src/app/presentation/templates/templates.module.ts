import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from './products-table/products-table.component';
import {OrganismsModule} from "@organisms/organisms.module";



@NgModule({
  declarations: [
    ProductsTableComponent
  ],
  exports: [
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    OrganismsModule
  ]
})
export class TemplatesModule { }
