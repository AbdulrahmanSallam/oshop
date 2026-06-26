import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
