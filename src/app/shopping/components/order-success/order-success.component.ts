import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  order$!: Observable<Order>;

  ngOnInit(): void {
    this.order$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => this.orderService.getOrderById(id!)),
    );
  }

  getTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}
