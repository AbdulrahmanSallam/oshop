import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Database, ref } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { push } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly db = inject(Database);
  private readonly shoppingCartService = inject(ShoppingCartService);

  async placeOrder(order: Order) {
    const ordersRef = ref(this.db, '/orders');
    const result = await push(ordersRef, order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
