import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Order, Shipping } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderService } from 'src/app/src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  private readonly ShoppingCartService = inject(ShoppingCartService);
  private readonly orderService = inject(OrderService);
  private readonly authsService = inject(AuthService);
  private readonly subject: Subject<void> = new Subject();
  userId!: string;

  cart!: ShoppingCart | null;

  shippingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  async ngOnInit() {
    let cart$ = await this.ShoppingCartService.getShoppingCart();
    cart$.pipe(takeUntil(this.subject)).subscribe((cart) => (this.cart = cart));
    this.authsService.appUser$
      .pipe(takeUntil(this.subject))
      .subscribe((user) => {
        if (user) this.userId = user._id;
      });
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  handleSubmit() {
    if (this.shippingForm.invalid) return;

    const formValue = this.shippingForm.value as {
      name: string;
      address: string;
      city: string;
    };

    const order = new Order(this.userId, formValue as Shipping, this.cart!);

    this.orderService.storeOrder(order);
  }
}
