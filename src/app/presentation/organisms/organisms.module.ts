import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AdminToolbarComponent} from './admin-toolbar/admin-toolbar.component';
import {ProductActionsToolbarComponent} from './product-actions-toolbar/product-actions-toolbar.component';
import {AtomsModule} from "@atoms/atoms.module";
import {MoleculesModule} from "@molecules/molecules.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from './table/table.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {RouterLink} from "@angular/router";
import {ProductFormComponent} from './product-form/product-form.component';

const components = [
  AdminToolbarComponent
];

@NgModule({
  declarations: [...components, ProductActionsToolbarComponent, TableComponent, PaginatorComponent, ProductFormComponent],
  exports: [...components, ProductActionsToolbarComponent, TableComponent, PaginatorComponent, ProductFormComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [DatePipe]
})
export class OrganismsModule {
}
