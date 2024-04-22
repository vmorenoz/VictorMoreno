import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCreateComponent} from './product-create.component';
import {OrganismsModule} from "@organisms/organisms.module";
import {TemplatesModule} from "@templates/templates.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FinancialProductService} from "@domain/services/financial-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FinancialProduct} from "@domain/models/financial-product";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
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

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createProduct on productService when createProduct is called', () => {
    jest.spyOn(component.productService, 'createProduct').mockReturnValue({subscribe: jest.fn()} as any);
    const productData: FinancialProduct = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    };
    component.createProduct(productData);
    expect(component.productService.createProduct).toHaveBeenCalledWith(productData);
  });

  it('should navigate to /products/list after successful product creation', () => {
    jest.spyOn(component.productService, 'createProduct').mockReturnValue(of({message: 'Product created'} as any));
    jest.spyOn(component['router'], 'navigate');
    const productData: FinancialProduct = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    };
    component.createProduct(productData);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/products/list']);
  });
});
