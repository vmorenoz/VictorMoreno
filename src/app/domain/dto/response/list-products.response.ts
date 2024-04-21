import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class ListProductsResponse extends ApiResponse<FinancialProduct[]> {

  static handleSuccess(response: HttpResponse<any>): ListProductsResponse {
    const items = FinancialProduct.fromJsonArray(response.body);
    return ListProductsResponse.successResponse(items, 'Productos listados correctamente');
  }

  static handleError(error: { status: number, error: any }) {
    const possibleErrors: { [key: string]: string } = {
      400: 'Bad Request',
      500: 'Internal Server Error',
      default: 'Unknown Error'
    };
    const errorMessage = possibleErrors[error.status] ?? possibleErrors['default'];
    return ListProductsResponse.errorResponse(errorMessage, error.error, error.status);
  }
}
