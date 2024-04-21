import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {FinancialProduct} from "@domain/models/financial-product";
import {catchError, distinctUntilChanged, filter, map, Observable, of, switchMap, timer} from "rxjs";
import {ProductState} from "@state/product.state";
import {Router} from "@angular/router";
import {FinancialProductService} from "@domain/services/financial-product.service";

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

  @Output() onSubmit = new EventEmitter<FinancialProduct>();

  productFormGroup!: FormGroup<FinancialProductForm>;
  isEditing = false;
  cacheSet = new Map<string, Observable<ValidationErrors | null>>();

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly productService: FinancialProductService,
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
      ], [
        this.productExistenceValidator()
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
    this.fillFormWhenEditing();
    this.initFormListeners();
  }

  submitForm() {
    if (this.productFormGroup.invalid) {
      return;
    }

    this.onSubmit.emit(FinancialProduct.fromJson(this.productFormGroup.getRawValue()));
  }

  resetForm() {
    this.productFormGroup.reset();
  }

  cancel() {
    this.router.navigate(['/products/list']);
  }

  private futureDateValidator(minDate: Date = new Date()): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = new Date(control.value);
      controlValue.setMinutes(controlValue.getMinutes() + controlValue.getTimezoneOffset());
      minDate.setHours(0, 0, 0, 0);
      if (controlValue < minDate) {
        return {'pastDate': minDate};
      }
      return null;
    };
  }

  private productExistenceValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const cachedResult = this.cacheSet.get(control.value);
      if (cachedResult) {
        return cachedResult;
      }

      return timer(300).pipe(
        switchMap(() => {
          return this.productService.verifyExistenceById(control.value).pipe(
            map(response => {
              return !response.data ? null : {duplicated: true};
            }),
            catchError(() => of({duplicated: true}))
          );
        }),
        distinctUntilChanged(),
      );
    };
  }

  private fillFormWhenEditing() {
    const selectedProduct = ProductState.selectedProduct();
    if (!selectedProduct) {
      this.isEditing = false;
      return;
    }

    const formatedDateRelease = this.datePipe.transform(selectedProduct.date_release, 'yyyy-MM-dd');
    const formatedDateRevision = this.datePipe.transform(selectedProduct.date_revision, 'yyyy-MM-dd');
    this.productFormGroup.setValue({
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description,
      logo: selectedProduct.logo,
      date_release: formatedDateRelease,
      date_revision: formatedDateRevision
    });
    this.productFormGroup.controls.id?.disable();
    this.isEditing = true;
  }

  private initFormListeners() {
    this.productFormGroup.controls.date_release
      .valueChanges
      .pipe(filter(date => !!date))
      .subscribe(date => {
        const revisionDate = new Date(date!);
        revisionDate.setMinutes(revisionDate.getMinutes() + revisionDate.getTimezoneOffset());
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);

        this.productFormGroup.controls.date_revision.setValue(this.datePipe.transform(revisionDate, 'yyyy-MM-dd'));
      });
  }
}
