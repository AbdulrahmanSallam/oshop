import { Component, inject, OnInit } from '@angular/core';

import { Observable, switchMap } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrderService);

  orders$!: Observable<Order[]>;

  ngOnInit(): void {
    this.orders$ = this.authService.appUser$.pipe(
      switchMap((u) => {
        if (!u?._id) {
          return []; // or return of([]) from 'rxjs'
        }
        return this.orderService.getOrdersByUserId(u._id);
      }),
    );
  }
}
