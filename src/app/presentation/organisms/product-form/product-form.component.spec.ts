import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductFormComponent} from './product-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AtomsModule} from "@atoms/atoms.module";
import {MoleculesModule} from "@molecules/molecules.module";
import {DatePipe} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {Router} from "@angular/router";

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, AtomsModule, MoleculesModule, HttpClientTestingModule],
      providers: [DatePipe, FinancialProductService, Router]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmit event when submitForm is called with valid form', () => {
    component.productFormGroup.setValue({
      id: '12345',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });
    jest.spyOn(component.onSubmit, 'emit');
    component.submitForm();
    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      id: '12345',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: new Date('2022-01-01T05:00:00.000Z'),
      date_revision: new Date('2023-01-01T05:00:00.000Z')
    });
  });

  it('should not emit onSubmit event when submitForm is called with invalid form', () => {
    component.productFormGroup.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    });
    jest.spyOn(component.onSubmit, 'emit');
    component.submitForm();
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it('should reset form when resetForm is called', () => {
    component.productFormGroup.setValue({
      id: '12345',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });
    component.resetForm();
    expect(component.productFormGroup.getRawValue()).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null
    });
  });

  it('should navigate to /products/list when cancel is called', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.cancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/products/list']);
  });
});
