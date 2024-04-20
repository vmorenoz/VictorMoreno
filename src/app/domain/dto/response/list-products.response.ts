import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class ListProductsResponse extends ApiResponse<FinancialProduct[]> {
  static fromResponse(response: HttpResponse<any>) {
    let mappedResponse: ListProductsResponse;
    switch (response.status) {
      case 200:
        const financialProducts = response.body.map((product: any) => FinancialProduct.fromJson(product));
        mappedResponse = ListProductsResponse.successResponse<FinancialProduct[]>(financialProducts);
        break;
      case 400:
        mappedResponse = ListProductsResponse.errorResponse('Bad Request', response.body, response.status);
        break;
      default:
        mappedResponse = ListProductsResponse.errorResponse('Unknown Error', response.body, response.status);
        break;
    }
    return mappedResponse;
  }
}
