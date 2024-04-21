import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputLabelComponent} from './input-label/input-label.component';
import {ButtonComponent} from './button/button.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';

const components = [
  InputLabelComponent, ButtonComponent
];

@NgModule({
  declarations: [...components, InputErrorsComponent],
  exports: [...components, InputErrorsComponent],
  imports: [
    CommonModule,
  ]
})
export class AtomsModule {
}
