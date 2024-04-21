import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProductsTableComponent} from './products-table/products-table.component';
import {OrganismsModule} from "@organisms/organisms.module";
import {AtomsModule} from "@atoms/atoms.module";


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
    AtomsModule,
  ],
  providers: [DatePipe]
})
export class TemplatesModule {
}
