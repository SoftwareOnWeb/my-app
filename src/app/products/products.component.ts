import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { PRODUCTS } from '../mock-product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }
  getProducts(): void {
    this.productService.getProducts().subscribe(prds => this.products = prds);
    // this.products = this.productService.getProducts();
  }
  ngOnInit() {
    this.getProducts();
  }
  add(name: string, details: string, price: number): void {
    name = name.trim();
    if (!name) { return; }
    /*let prd: Product;
    prd.name = name;
    prd.details = details;
    prd.price = price;
*/
    this.productService.addProduct({ name, details, price } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(prd: Product): void {
    /*let prd: Product;
    prd.name = name;
    prd.details = details;
    prd.price = price;
*/
    this.productService.deleteProduct(prd as Product)
      .subscribe();
      this.products = this.products.filter(p => p !== prd);
  }
}
