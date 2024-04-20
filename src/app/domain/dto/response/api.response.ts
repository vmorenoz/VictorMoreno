export class ApiResponse<T> {
  error: boolean = false;
  statusCode: number = 200;
  data!: T;
  message: string = '';

  static successResponse<T>(json: any, message: string = 'Success response'): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.data = json;
    response.message = message;
    return response;
  }

  static errorResponse(message: string, data: any, statusCode: number): ApiResponse<any> {
    const response = new ApiResponse();
    response.error = true;
    response.data = data;
    response.message = message;
    response.statusCode = statusCode;
    return response;
  }
}
