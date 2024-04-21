import {FinancialProduct} from "@domain/models/financial-product";
import {ApiResponse} from "@domain/dto/response/api.response";
import {HttpResponse} from "@angular/common/http";

export class CreateProductResponse extends ApiResponse<FinancialProduct> {

  static handleSuccess(response: HttpResponse<any>): CreateProductResponse {
    const items = FinancialProduct.fromJson(response.body);
    return CreateProductResponse.successResponse(items, 'Producto creado exitosamente');
  }

  static handleError(error: { status: number, error: any }) {
    const possibleErrors: { [key: string]: string } = {
      206: 'Partial Content',
      400: 'Bad Request',
      default: 'Unknown Error'
    };
    const errorMessage = possibleErrors[error.status] ?? possibleErrors['default'];
    return CreateProductResponse.errorResponse(errorMessage, error.error, error.status);
  }
}
