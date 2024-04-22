import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputLabelComponent} from './input-label/input-label.component';
import {ButtonComponent} from './button/button.component';
import {InputErrorsComponent} from './input-errors/input-errors.component';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SkeletonComponent} from './skeleton/skeleton.component';

const components = [
  InputLabelComponent, ButtonComponent, InputErrorsComponent, MenuButtonComponent, SkeletonComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AtomsModule {
}
