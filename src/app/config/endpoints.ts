import {environment} from "@env/environment";

export abstract class Endpoints {
  static readonly apiUrl = environment.apiUrl;
  static readonly listProducts = `${Endpoints.apiUrl}/bp/products`;
  static readonly createProduct = `${Endpoints.apiUrl}/bp/products`;
  static readonly updateProduct = `${Endpoints.apiUrl}/bp/products`;
  static readonly deleteProduct = (id: string) => `${Endpoints.apiUrl}/bp/products?id=${id}`;
  static readonly verifyExistenceById = (id: string) => `${Endpoints.apiUrl}/bp/products/verification?id=${id}`;
}
