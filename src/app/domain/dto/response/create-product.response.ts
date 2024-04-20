import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class CreateProductResponse extends ApiResponse<FinancialProduct> {

  static mapFromResponse(response: HttpResponse<any>): CreateProductResponse {
    let mappedResponse: CreateProductResponse;
    switch (response.status) {
      case 200: // OK
        mappedResponse = CreateProductResponse.successResponse<FinancialProduct>(response.body);
        break;
      case 206: // Partial Content
        mappedResponse = CreateProductResponse.errorResponse('Partial Content', response.body, response.status);
        break;
      case 400: // Bad Request
        mappedResponse = CreateProductResponse.errorResponse('Bad Request', response.body, response.status);
        break;
      default:
        mappedResponse = CreateProductResponse.errorResponse('Unknown Error', response.body, response.status);
        break;
    }
    return mappedResponse;
  }
}
