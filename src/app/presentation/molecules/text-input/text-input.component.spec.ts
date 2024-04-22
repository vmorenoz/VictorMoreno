import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextInputComponent} from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value when updateValue is called', () => {
    const mockEvent = {target: {value: 'test'}} as unknown as Event;
    component.registerOnChange(jest.fn());
    component.registerOnTouched(jest.fn());
    component.updateValue(mockEvent);
    expect(component.value).toBe('test');
  });

  it('should call onChange when updateValue is called', () => {
    const mockEvent = {target: {value: 'test'}} as unknown as Event;
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    component.updateValue(mockEvent);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('should call onTouched when updateValue is called', () => {
    const mockEvent = {target: {value: 'test'}} as unknown as Event;
    const mockOnTouched = jest.fn();
    component.registerOnTouched(mockOnTouched);
    component.updateValue(mockEvent);
    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should write value when writeValue is called', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  it('should register onChange when registerOnChange is called', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);
    expect(component.onChange).toBe(mockOnChange);
  });

  it('should register onTouched when registerOnTouched is called', () => {
    const mockOnTouched = jest.fn();
    component.registerOnTouched(mockOnTouched);
    expect(component.onTouched).toBe(mockOnTouched);
  });

  it('should set disabled state when setDisabledState is called', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });
});
