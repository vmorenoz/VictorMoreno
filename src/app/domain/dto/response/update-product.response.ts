import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class UpdateProductResponse extends ApiResponse<FinancialProduct> {

  static mapFromResponse(response: HttpResponse<any>): UpdateProductResponse {
    let mappedResponse: UpdateProductResponse;
    switch (response.status) {
      case 200: // OK
        mappedResponse = UpdateProductResponse.successResponse<FinancialProduct>(response.body);
        break;
      case 206: // Partial Content
        mappedResponse = UpdateProductResponse.errorResponse('Partial Content', response.body, response.status);
        break;
      case 400: // Bad Request
        mappedResponse = UpdateProductResponse.errorResponse('Bad Request', response.body, response.status);
        break;
      case 401: // Bad Request
        mappedResponse = UpdateProductResponse.errorResponse('You must be the owner', response.body, response.status);
        break;
      default:
        mappedResponse = UpdateProductResponse.errorResponse('Unknown Error', response.body, response.status);
        break;
    }
    return mappedResponse;
  }
}
