import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {ProductsTableComponent} from './products-table.component';
import {FinancialProductService} from '@domain/services/financial-product.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FinancialProduct} from '@domain/models/financial-product';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let financialProductService: FinancialProductService;
  let router: Router;

  beforeEach(async () => {
    const financialProductServiceMock = {
      listProducts: jest.fn().mockReturnValue(of({data: []})),
      deleteProduct: jest.fn().mockReturnValue(of({error: false}))
    };

    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      providers: [
        {provide: FinancialProductService, useValue: financialProductServiceMock},
        {provide: Router, useValue: routerMock},
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    financialProductService = TestBed.inject(FinancialProductService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(financialProductService.listProducts).toHaveBeenCalled();
  });

  it('should delete product when deleteProduct is called', () => {
    const product: FinancialProduct = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    };
    component.productToDelete = product;
    component.deleteProduct();
    expect(financialProductService.deleteProduct).toHaveBeenCalledWith(product.id);
  });

  it('should navigate to products/edit when editProduct is called', () => {
    const product: FinancialProduct = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test-logo.png',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    };
    component.editProduct(product);
    expect(router.navigate).toHaveBeenCalledWith(['products/edit']);
  });
});
