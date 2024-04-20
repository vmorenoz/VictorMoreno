import {Component, forwardRef, Input, Optional, Self, SkipSelf} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors} from '@angular/forms';

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
  @Input() type: 'text' | 'date' = 'text';


  value!: string;
  disabled: boolean = false;
  validationErrors!: ValidationErrors | null | undefined;
  onChange!: (value: string) => void;
  onTouched!: () => void;

  constructor(@Optional() @SkipSelf() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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
    if (this.ngControl) {
      console.log('Validation errors', this.ngControl.control?.errors);
      this.validationErrors = this.ngControl.control?.errors;
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
