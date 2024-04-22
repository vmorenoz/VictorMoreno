import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FinancialProductService} from './financial-product.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Endpoints} from "@config/endpoints";
import {FinancialProduct} from "@domain/models/financial-product";
import {CreateProductResponse} from "@domain/dto/response/create-product.response";
import {UpdateProductResponse} from "@domain/dto/response/update-product.response";
import {ApiResponse} from "@domain/dto/response/api.response";

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpMock: HttpTestingController;
  let dummyProduct: FinancialProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService]
    });
    service = TestBed.inject(FinancialProductService);
    httpMock = TestBed.inject(HttpTestingController);
    dummyProduct = new FinancialProduct();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should list products', () => {
    service.listProducts().subscribe((res: HttpResponse<any>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(Endpoints.listProducts);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should create a product', () => {
    service.createProduct(dummyProduct).subscribe((res: CreateProductResponse) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(Endpoints.createProduct);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a product', () => {
    service.updateProduct(dummyProduct).subscribe((res: UpdateProductResponse) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(Endpoints.updateProduct);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a product', () => {
    service.deleteProduct('1').subscribe((res: ApiResponse<boolean>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(Endpoints.deleteProduct('1'));
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should verify existence by id', () => {
    service.verifyExistenceById('1').subscribe((res: ApiResponse<boolean>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(Endpoints.verifyExistenceById('1'));
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
