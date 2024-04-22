import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductActionsToolbarComponent} from './product-actions-toolbar.component';
import {ProductState} from "@state/product.state";
import {FinancialProduct} from "@domain/models/financial-product";
import {ReactiveFormsModule} from "@angular/forms";
import {MoleculesModule} from "@molecules/molecules.module";
import {AtomsModule} from "@atoms/atoms.module";

describe('ProductActionsToolbarComponent', () => {
  let component: ProductActionsToolbarComponent;
  let fixture: ComponentFixture<ProductActionsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductActionsToolbarComponent],
      imports: [ReactiveFormsModule, AtomsModule, MoleculesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionsToolbarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when searchControl value changes', () => {
    jest.spyOn(component.search, 'emit');

    component.searchControl.setValue('test', {emitEvent: true});

    jest.advanceTimersByTime(400);

    expect(component.search.emit).toHaveBeenCalledWith('test');
  });


  it('should navigate to /products/create when goToCreateProduct is called', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.goToCreateProduct();
    expect(navigateSpy).toHaveBeenCalledWith(['/products/create']);
  });

  it('should set selectedProduct to null when goToCreateProduct is called', () => {
    const dummyProduct = FinancialProduct.fromJson({id: '1', name: 'test'});
    ProductState.selectedProduct.set(dummyProduct);
    component.goToCreateProduct();
    expect(ProductState.selectedProduct()).toBe(null);
  });

  it('should initialize searchControl when initializeControls is called', () => {
    component.initializeControls();
    expect(component.searchControl).toBeDefined();
  });
});
