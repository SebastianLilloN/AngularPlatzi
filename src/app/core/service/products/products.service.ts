import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import * as Sentry from '@sentry/browser';

interface Users {
  email: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`
      ${environment.url_api}/products`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }
  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }
  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes).pipe(
      catchError(this.handleError),
      map((response: any) => response.results as Users[])
    );
  }
  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`).pipe(
      catchError(this.handleError),
      map((response: any) => response.results as Users[])
    );
  }
  getRandomUsers(): Observable<Users[]> {
    return this.http.get('https://randomuser.me/api/?results=2').pipe(
      retry(3),
      catchError(this.handleError),
      map((response: any) => response.results as Users[])
    );
  }
  getFile() {
    return this.http.get('assets/files/test.txt', { responseType: 'text' });
  }
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    Sentry.captureException(err);
    return throwError('ups algo salio mal');
  }
}
