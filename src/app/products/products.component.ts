import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import {PRODUCTS} from '../mock-product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products: Product[];
selectedProduct: Product;
  constructor(private productService: ProductService) { }
  getProducts(): void {
    this.products = this.productService.getProducts();
  }
  ngOnInit() {
    this.getProducts();
  }
  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

}
