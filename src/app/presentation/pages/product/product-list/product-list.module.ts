import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductListRoutingModule} from './product-list-routing.module';
import {ProductListComponent} from './product-list.component';
import {OrganismsModule} from "@organisms/organisms.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MoleculesModule} from "@molecules/molecules.module";
import {AtomsModule} from "@atoms/atoms.module";
import {TemplatesModule} from "@templates/templates.module";


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    OrganismsModule,
    MoleculesModule,
    ReactiveFormsModule,
    AtomsModule,
    TemplatesModule
  ]
})
export class ProductListModule {
}
