import { Component, inject, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  private readonly shoppingCartService = inject(ShoppingCartService);

  cart$!: Observable<ShoppingCart | null>;

  ngOnInit() {
    this.cart$ = this.shoppingCartService.getShoppingCart();
  }
}
