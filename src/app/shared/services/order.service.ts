import { inject, Injectable } from '@angular/core';
import { Order } from 'shared/models/order';
import {
  Database,
  ref,
  query,
  orderByChild,
  equalTo,
  listVal,
  objectVal,
} from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { push } from 'firebase/database';
import { map, Observable } from 'rxjs';

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

  getOrderById(orderId: string): Observable<Order> {
    const orderRef = ref(this.db, `/orders/${orderId}`);
    return objectVal(orderRef, { keyField: 'key' }).pipe(
      map((order: any) => order as Order),
    );
  }
}
