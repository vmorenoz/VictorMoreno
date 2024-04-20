import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endpoints} from "@config/endpoints";
import {ApiService} from "@domain/services/api.service";
import {map, Observable} from "rxjs";
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

  listProducts(): Observable<ListProductsResponse> {
    return this.get(Endpoints.listProducts)
      .pipe(map(response => ListProductsResponse.fromResponse(response)))
  }

  createProduct(data: FinancialProduct): Observable<CreateProductResponse> {
    return this.post(Endpoints.createProduct, data)
      .pipe(map(response => CreateProductResponse.mapFromResponse(response)),);
  }

  updateProduct(data: FinancialProduct): Observable<UpdateProductResponse> {
    return this.put(Endpoints.updateProduct, data)
      .pipe(map(response => UpdateProductResponse.mapFromResponse(response)))
  }

  deleteProduct(id: string): Observable<ApiResponse<boolean>> {
    return this.delete(Endpoints.deleteProduct(id))
      .pipe(map(response => {
        let mappedResponse: ApiResponse<boolean>;
        switch (response.status) {
          case 200:
            mappedResponse = ApiResponse.successResponse(true);
            break;
          case 400:
            mappedResponse = ApiResponse.errorResponse('Bad Request', false, response.status);
            break;
          case 404:
            mappedResponse = ApiResponse.errorResponse('Product Not Found', false, response.status);
            break;
          default:
            mappedResponse = ApiResponse.errorResponse('Unknown Error', false, response.status);
            break;
        }
        return mappedResponse;
      }));
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
