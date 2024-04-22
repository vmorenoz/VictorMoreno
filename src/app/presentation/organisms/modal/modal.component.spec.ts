import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalComponent} from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isVisible to true when open is called', () => {
    component.open();
    expect(component.isVisible).toBe(true);
  });

  it('should set isVisible to false when close is called', () => {
    component.open();
    component.close();
    expect(component.isVisible).toBe(false);
  });

  it('should not change isVisible when open is called multiple times', () => {
    component.open();
    component.open();
    expect(component.isVisible).toBe(true);
  });

  it('should not change isVisible when close is called multiple times', () => {
    component.open();
    component.close();
    component.close();
    expect(component.isVisible).toBe(false);
  });
});
