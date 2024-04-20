import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProductsTableComponent} from './products-table/products-table.component';
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
    OrganismsModule,
  ],
  providers: [DatePipe]
})
export class TemplatesModule {
}
