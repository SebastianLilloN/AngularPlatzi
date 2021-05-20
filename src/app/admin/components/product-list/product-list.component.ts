import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/service/products/products.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((rta) => {
      this.fetchProducts();
    });
  }
}
