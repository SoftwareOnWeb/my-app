import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './mock-product';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private productsUrl = 'api/products';  // URL to web api
  private productsUrl = 'http://localhost:60240/api/Products';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  getProducts(): Observable<Product[]> {
    this.messageService.add('Data collected successfully for getProducts');
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  /*
  getProductById(id: Number): Observable<Product> {
    this.messageService.add('Data collected successfully for getProductById');
    return of(PRODUCTS.filter(p => p.id === id)[0];
  }
*/

  /** GET product by id. Will 404 if id not found */
  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    let putURL = `${this.productsUrl}/${product.id}`;
    return this.http.put(putURL, product, httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap((prd: Product) => this.log(`added product w/ id=${prd.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
