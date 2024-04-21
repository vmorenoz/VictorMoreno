import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endpoints} from "@config/endpoints";
import {ApiService} from "@domain/services/api.service";
import {catchError, map, Observable, of} from "rxjs";
import {ListProductsResponse} from "@domain/dto/response/list-products.response";
import {FinancialProduct} from "@domain/models/financial-product";
import {CreateProductResponse} from "@domain/dto/response/create-product.response";
import {UpdateProductResponse} from "@domain/dto/response/update-product.response";
import {ApiResponse} from "@domain/dto/response/api.response";

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
  }

  listProducts(): Observable<ListProductsResponse | any> {
    return this.get(Endpoints.listProducts).pipe(
      map(response => {
        return ListProductsResponse.handleSuccess(response);
      }),
      catchError(error => {
        return of(ListProductsResponse.handleError(error));
      })
    )
  }

  createProduct(data: FinancialProduct): Observable<CreateProductResponse> {
    return this.post(Endpoints.createProduct, data).pipe(
      map(response => {
        return CreateProductResponse.handleSuccess(response);
      }),
      catchError(error => {
        return of(CreateProductResponse.handleError(error));
      })
    );
  }

  updateProduct(data: FinancialProduct): Observable<UpdateProductResponse> {
    return this.put(Endpoints.updateProduct, data).pipe(
      map(response => UpdateProductResponse.handleSuccess(response)),
      catchError(error => of(UpdateProductResponse.handleError(error)))
    )
  }

  deleteProduct(id: string): Observable<ApiResponse<boolean>> {
    return this.delete(Endpoints.deleteProduct(id), 'text').pipe(
      map(() => {
        return ApiResponse.successResponse<boolean>(true, 'Product deleted successfully');
      }),
      catchError(error => {
        return of(ApiResponse.errorResponse('Error deleting product', false, error.status));
      })
    );
  }

  verifyExistenceById(id: string): Observable<ApiResponse<boolean>> {
    return this.get(Endpoints.verifyExistenceById(id))
      .pipe(map(response => {
        let mappedResponse: ApiResponse<boolean>;
        switch (response.status) {
          case 200:
            mappedResponse = ApiResponse.successResponse(!!response.body);
            break;
          default:
            mappedResponse = ApiResponse.errorResponse('Unknown Error', false, response.status);
            break;
        }
        return mappedResponse;
      }));
  }
}
