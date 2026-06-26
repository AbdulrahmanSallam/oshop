import { inject, Injectable } from '@angular/core';
import { Database, push } from '@angular/fire/database';
import { ref } from 'firebase/database';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  db = inject(Database);

  storeOrder(order: Order) {
    const orderRef = ref(this.db, '/orders/');
    return push(orderRef, order);
  }
}
