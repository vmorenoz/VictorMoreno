import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputErrorsComponent} from './input-errors.component';

describe('InputErrorsComponent', () => {
  let component: InputErrorsComponent;
  let fixture: ComponentFixture<InputErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputErrorsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no errors when input is null', () => {
    component.errors = {};
    expect(component.errorsArray).toEqual([]);
  });

  it('should return invalid field message for unknown error key', () => {
    component.errors = {unknownErrorKey: {}};
    expect(component.errorsArray).toEqual(['El campo es inválido']);
  });

  it('should return required field message for required error', () => {
    component.errors = {required: true};
    expect(component.errorsArray).toEqual(['El campo es requerido']);
  });

  it('should return minlength message for minlength error', () => {
    component.errors = {minlength: {requiredLength: 5}};
    expect(component.errorsArray).toEqual(['El campo debe tener al menos 5 caracteres']);
  });

  it('should return maxlength message for maxlength error', () => {
    component.errors = {maxlength: {requiredLength: 10}};
    expect(component.errorsArray).toEqual(['El campo debe tener como máximo 10 caracteres']);
  });

  it('should return pastDate message for pastDate error', () => {
    const date = new Date(2022, 1, 1);
    component.errors = {pastDate: date};
    expect(component.errorsArray).toEqual([`La fecha debe ser igual o mayor que ${component.formatDate(date)}`]);
  });

  it('should return duplicated message for duplicated error', () => {
    component.errors = {duplicated: true};
    expect(component.errorsArray).toEqual(['El campo ya existe']);
  });
});
