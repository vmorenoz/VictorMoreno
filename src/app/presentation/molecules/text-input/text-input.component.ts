import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label!: string;
  @Input() placeholder: string = '';


  value!: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(inputEvent: Event): void {
    const value = (inputEvent.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
