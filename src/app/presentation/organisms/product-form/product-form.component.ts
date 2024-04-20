import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DatePipe} from "@angular/common";

export interface FinancialProductForm {
  id?: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  logo: FormControl<string | null>;
  date_release: FormControl<string | null>;
  date_revision: FormControl<string | null>;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productFormGroup!: FormGroup<FinancialProductForm>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly datePipe: DatePipe) {
  }

  ngOnInit() {
    this.createProductFormGroup();
  }

  createProductFormGroup() {
    this.productFormGroup = this.formBuilder.group<FinancialProductForm>({
      id: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      name: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      logo: this.formBuilder.control<string>('', [
        Validators.required,
      ]),
      date_release: this.formBuilder.control<string | null>(null, [
        Validators.required,
        this.futureDateValidator()
      ]),
      date_revision: this.formBuilder.control<string | null>({
        value: null,
        disabled: true
      }, Validators.required),
    });

    // Listen for changes in the date_release field
    this.productFormGroup.controls.date_release
      .valueChanges
      .subscribe(date => {
        if (!date) return;

        const revisionDate = new Date(date);
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);
        this.productFormGroup.controls.date_revision.setValue(this.datePipe.transform(revisionDate, 'yyyy-MM-dd'));
      });
  }

  private futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (controlValue < today) {
        return {'pastDate': true};
      }
      return null;
    };
  }
}
