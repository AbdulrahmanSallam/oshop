import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  private readonly ShoppingCartService = inject(ShoppingCartService);

  cart$!: Observable<ShoppingCart | null>;

  async ngOnInit() {
    this.cart$ = await this.ShoppingCartService.getShoppingCart();
  }
}
