import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {Endpoints} from "@config/endpoints";
import {ApiService} from "@domain/services/api.service";
import {map, Observable} from "rxjs";
import {ListProductsResponse} from "@domain/dto/response/list-products.response";
import {FinancialProduct} from "@domain/models/financial-product";

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService extends ApiService {

  protected readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {
    super(http);
  }

  listProducts(): Observable<ListProductsResponse> {
    return this.get(Endpoints.listProducts)
      .pipe(map(response => ListProductsResponse.fromJson(response)))
  }

  createProduct(data: FinancialProduct): Observable<any> {
    return this.post(Endpoints.createProduct, data)
  }

  updateProduct(data: FinancialProduct): Observable<any> {
    return this.put(Endpoints.updateProduct, data)
  }

  deleteProduct(id: number): Observable<any> {
    return this.delete(Endpoints.deleteProduct, id)
  }

  verifyExistenceById(id: string): Observable<any> {
    return this.get(Endpoints.verifyExistenceById(id))
  }
}
