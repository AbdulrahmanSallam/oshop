import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
