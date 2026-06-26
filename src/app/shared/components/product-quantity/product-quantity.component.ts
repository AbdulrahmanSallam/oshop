import { Component, inject, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCartItem } from 'shared/models/ShoppingCartItem';

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

    // Prevent negative quantities
    if (newQuantity < 0) {
      return;
    }

    if (newQuantity > 99) {
      return;
    }

    this.shoppingCartService
      .updateQuantity(this.shoppingCartItem, value)
      .catch((error) => console.error('Error updating quantity:', error));
  }
}
