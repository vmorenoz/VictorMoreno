import {FinancialProduct} from "@domain/models/financial-product";

export class ListProductsResponse {
  data: FinancialProduct[] = [];

  static fromJson(json: any): ListProductsResponse {
    const response = new ListProductsResponse();
    response.data = json.data.map((product: any) => FinancialProduct.fromJson(product));
    return response;
  }
}
