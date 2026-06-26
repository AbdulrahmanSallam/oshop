import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ height: 0, opacity: 0, overflow: 'hidden' }),
        ),
      ]),
    ]),
  ],
})
export class AdminOrdersComponent {
  private readonly orderService = inject(OrderService);

  orders$!: Observable<Order[]>;
  private expandedOrders = new Set<string>();

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
  }

  toggleOrder(order: Order): void {
    const key = order.key!;
    if (this.expandedOrders.has(key)) {
      this.expandedOrders.delete(key);
    } else {
      this.expandedOrders.add(key);
    }
  }

  isExpanded(order: Order): boolean {
    return this.expandedOrders.has(order.key!);
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}
