import {Component, Input} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrl: './input-errors.component.css'
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | null = null;

  errorMessages: { [key: string]: (value: any) => string } = {
    required: () => 'El campo es requerido',
    minlength: (error: any) => `El campo debe tener al menos ${error.requiredLength} caracteres`,
    maxlength: (error: any) => `El campo debe tener como máximo ${error.requiredLength} caracteres`,
    pastDate: (error: Date) => `La fecha debe ser igual o mayor que ${this.formatDate(error)}`,
    duplicated: () => 'El campo ya existe',
  }

  get errorsArray(): string[] {
    if (!this.errors) {
      return [];
    }
    return Object.keys(this.errors).map((key) => {
      const error = this.errors![key];
      if (!error) return 'El campo es inválido';
      return this.errorMessages[key](error);
    });
  }

  private formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month < 10 ? '0' + month : month}/${day}`;
  }
}
