import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../core/service/products/products.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }
  createProduct() {
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde angular',
      image: '/assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto',
    };
    this.productService.createProduct(newProduct).subscribe((product) => {});
  }
  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 5555,
      description: 'edicion producto',
    };
    this.productService
      .updateProduct('2', updateProduct)
      .subscribe((product) => {
        console.log(product);
      });
  }
  deleteProduct() {
    this.productService.deleteProduct('222').subscribe((rta) => {
      console.log(rta);
    });
  }
}
