import { Component, inject, Input } from '@angular/core';
import {
  ShoppingCartItem,
  ShoppingCartService,
} from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  shoppingCartService = inject(ShoppingCartService);

  @Input({ required: true, alias: 'shopping-cart-item' })
  shoppingCartItem!: ShoppingCartItem;

  updateQuantity(value: number) {
    const newQuantity = this.shoppingCartItem.quantity + value;

    if (newQuantity < 0) {
      return;
    }

    this.shoppingCartService
      .updateQuantity(this.shoppingCartItem, value)
      .catch((error) => console.error('Error updating quantity:', error));
  }
}
