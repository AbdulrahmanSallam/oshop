import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrderService);

  orders$!: Observable<Order[]>;

  ngOnInit(): void {
    this.orders$ = this.authService.appUser$.pipe(
      switchMap((u) => this.orderService.getOrdersByUserId(u?._id!)),
    );
  }
}
