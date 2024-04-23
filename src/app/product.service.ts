import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productApi = "https://dummyjson.com/products";
  private deleteApi = "https://dummyjson.com/products/";

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(this.productApi).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.deleteApi + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Status: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
