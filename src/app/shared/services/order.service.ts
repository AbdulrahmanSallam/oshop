import { inject, Injectable } from '@angular/core';
import { Order } from 'shared/models/order';
import {
  Database,
  list,
  ref,
  query,
  orderByChild,
  equalTo,
  listVal,
} from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { push } from 'firebase/database';
import { Observable } from 'rxjs';

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

  getOrders(): Observable<Order[]> {
    const ordersRef = ref(this.db, '/orders');
    return listVal(ordersRef, { keyField: 'key' });
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    const ordersRef = ref(this.db, '/orders');
    const userOrdersQuery = query(
      ordersRef,
      orderByChild('userId'),
      equalTo(userId),
    );

    return listVal(userOrdersQuery, { keyField: 'key' });
  }
}
