import { Component, inject, Input } from '@angular/core';
import { Product } from 'src/app/services/product.service';
import {
  ShoppingCart,
  ShoppingCartService,
} from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  shoppingCartService = inject(ShoppingCartService);

  @Input('product') product!: Product;
  @Input('show-actions') showActions!: boolean;
  @Input('cart') shoppingCart!: ShoppingCart;

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart || !this.shoppingCart.items) return 0;

    const item = this.shoppingCart.items[this.product.key!];
    return item ? item.quantity : 0;
  }
}
