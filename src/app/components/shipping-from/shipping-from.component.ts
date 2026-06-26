import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';
import { Order, Shipping } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-from',
  templateUrl: './shipping-from.component.html',
  styleUrls: ['./shipping-from.component.scss'],
})
export class ShippingFromComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart | null;

  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$: Subject<void> = new Subject();

  userId!: string;
  shippingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.authService.appUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => {
        if (user) this.userId = user._id || user.uid;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async handleSubmit() {
    if (this.shippingForm.invalid || !this.cart) return;

    const formValue = this.shippingForm.value as {
      name: string;
      address: string;
      city: string;
    };

    const order = new Order(this.userId, formValue as Shipping, this.cart);
    const result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }
}
