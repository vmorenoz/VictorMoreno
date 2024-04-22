import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiService} from './api.service';
import {HttpResponse} from '@angular/common/http';
import {environment} from "@env/environment";

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const url = 'http://test.com';
    service.get(url).subscribe((res: HttpResponse<any>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should perform POST request', () => {
    const url = 'http://test.com';
    const body = {data: 'test'};
    service.post(url, body).subscribe((res: HttpResponse<any>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should perform PUT request', () => {
    const url = 'http://test.com';
    const body = {data: 'test'};
    service.put(url, body).subscribe((res: HttpResponse<any>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should perform DELETE request', () => {
    const url = 'http://test.com';
    service.delete(url).subscribe((res: HttpResponse<any>) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should set headers', () => {
    const url = 'http://test.com';
    service.get(url).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.headers.get('authorId')).toEqual(environment.authorId);
  });
});
