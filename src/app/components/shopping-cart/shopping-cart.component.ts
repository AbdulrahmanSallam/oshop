import { Component, inject } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable, map } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

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
}
