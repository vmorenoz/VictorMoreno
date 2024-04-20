import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from "@molecules/text-input/text-input.component";
import {AtomsModule} from "@atoms/atoms.module";
import {FormsModule} from "@angular/forms";
import { SelectInputComponent } from './select-input/select-input.component';

const components = [TextInputComponent];

@NgModule({
  declarations: [...components, SelectInputComponent],
  exports: [...components, SelectInputComponent],
  imports: [
    CommonModule,
    AtomsModule,
    FormsModule
  ]
})
export class MoleculesModule {
}
