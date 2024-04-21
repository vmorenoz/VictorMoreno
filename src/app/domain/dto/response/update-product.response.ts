import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class UpdateProductResponse extends ApiResponse<FinancialProduct> {

  static handleSuccess(response: HttpResponse<any>): UpdateProductResponse {
    const items = FinancialProduct.fromJson(response.body);
    return UpdateProductResponse.successResponse(items, 'Producto actualizado correctamente');
  }

  static handleError(error: { status: number, error: any }) {
    const possibleErrors: { [key: string]: string } = {
      400: 'Bad Request',
      401: 'You must be the owner of the product',
      500: 'Internal Server Error',
      default: 'Unknown Error'
    };
    const errorMessage = possibleErrors[error.status] ?? possibleErrors['default'];
    return UpdateProductResponse.errorResponse(errorMessage, error.error, error.status);
  }
}
