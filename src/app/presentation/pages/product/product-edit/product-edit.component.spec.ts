import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductEditComponent} from './product-edit.component';
import {FinancialProductService} from "@domain/services/financial-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {FinancialProduct} from "@domain/models/financial-product";
import {ProductState} from "@state/product.state";
import {UpdateProductResponse} from "@domain/dto/response/update-product.response";
import {ApiResponse} from "@domain/dto/response/api.response";
import {ReactiveFormsModule} from "@angular/forms";
import {OrganismsModule} from "@organisms/organisms.module";
import {TemplatesModule} from "@templates/templates.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [ReactiveFormsModule, OrganismsModule, TemplatesModule, HttpClientTestingModule],
      providers: [
        FinancialProductService,
        Router,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(null),
            snapshot: {
              params: null,
              data: null
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateProduct on productService when updateProduct is called', () => {
    jest.spyOn(component.productService, 'updateProduct')
    const productData: FinancialProduct = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: new Date('2022-01-01T05:00:00.000Z'),
      date_revision: new Date('2022-01-01T05:00:00.000Z'),
    };
    component.updateProduct(productData);
    expect(component.productService.updateProduct).toHaveBeenCalledWith(productData);
  });

  it('should navigate to /products/list if no selected product on initialization', () => {
    jest.spyOn(component['router'], 'navigate');
    ProductState.selectedProduct.set(null);
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/products/list']);
  });

  it('should not navigate if there is a selected product on initialization', () => {
    jest.spyOn(component['router'], 'navigate');
    const dummyProduct = FinancialProduct.fromJson({id: '123', name: 'Test Product'});
    ProductState.selectedProduct.set(dummyProduct);
    component.ngOnInit();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
