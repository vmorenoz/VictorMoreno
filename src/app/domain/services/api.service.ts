import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly _http: HttpClient) {
  }

  private getHeaders() {
    return new HttpHeaders({
      'authorId': environment.authorId,
    });
  }

  get(url: string) {
    return this._http.get(url, {headers: this.getHeaders()});
  }

  post(url: string, body: any) {
    return this._http.post(url, body, {headers: this.getHeaders()});
  }

  put(url: string, body: any) {
    return this._http.put(url, body, {headers: this.getHeaders()});
  }

  delete(url: string, id: number) {
    return this._http.delete(`${url}/${id}`, {headers: this.getHeaders()});
  }
}
