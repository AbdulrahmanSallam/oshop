import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from 'shared/models/Product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/ShoppingCartItem';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  private readonly shoppingCartService = inject(ShoppingCartService);

  cart$!: Observable<ShoppingCart>;

  ngOnInit() {
    this.cart$ = this.shoppingCartService
      .getShoppingCart()
      .pipe(map((cart) => cart || new ShoppingCart(new Date().getTime(), {})));
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  removeItem(item: ShoppingCartItem) {
    const product = { key: item.key } as Product;
    this.shoppingCartService.removeFromCart(product);
  }
}
