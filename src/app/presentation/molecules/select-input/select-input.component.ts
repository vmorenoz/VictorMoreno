import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

type SelectOptionValue = string | number;

export interface ISelectOption {
  value: SelectOptionValue;
  label: string;
}

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor {

  @Input() label!: SelectOptionValue | null;
  @Input() placeholder: string = '';
  @Input() options: ISelectOption[] = [];

  value!: string;
  onChange!: (value: SelectOptionValue) => void;
  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: SelectOptionValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(inputEvent: Event): void {
    const value: SelectOptionValue = (inputEvent.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
