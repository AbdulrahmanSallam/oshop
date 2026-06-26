import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input({ required: true }) order!: Order;
  @Input() showUser = false;

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  getTotal(): number {
    return this.order.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}
