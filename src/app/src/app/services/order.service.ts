import { inject, Injectable } from '@angular/core';
import { Database, push } from '@angular/fire/database';
import { ref } from 'firebase/database';
import { Order } from 'src/app/models/order';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly db = inject(Database);
  private readonly shoppingCart = inject(ShoppingCartService);

  placeOrder(order: Order) {
    const orderRef = ref(this.db, '/orders/');
    const result = push(orderRef, order);
    this.shoppingCart.clearCart();
    return result;
  }
}
