import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminToolbarComponent} from './admin-toolbar/admin-toolbar.component';
import {ProductActionsToolbarComponent} from './product-actions-toolbar/product-actions-toolbar.component';
import {AtomsModule} from "@atoms/atoms.module";
import {MoleculesModule} from "@molecules/molecules.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {RouterLink} from "@angular/router";

const components = [
  AdminToolbarComponent
];

@NgModule({
  declarations: [...components, ProductActionsToolbarComponent, TableComponent, PaginatorComponent],
  exports: [...components, ProductActionsToolbarComponent, TableComponent, PaginatorComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class OrganismsModule {
}
