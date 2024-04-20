import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputLabelComponent} from './input-label/input-label.component';
import {ButtonComponent} from './button/button.component';

const components = [
  InputLabelComponent, ButtonComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
  ]
})
export class AtomsModule {
}
