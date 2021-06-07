import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CartService } from 'src/app/core/service/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input()
  product!: Product;

  @Output()
  productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  addCart() {
    console.log('Añadir al carrito');
    this.cartService.addCart(this.product);
  }
}
