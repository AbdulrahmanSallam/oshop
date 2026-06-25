import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly shoppingCartService = inject(ShoppingCartService);
  appUser: AppUser | null = null;

  cart$!: Observable<ShoppingCart | null>;

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => (this.appUser = user));

    this.cart$ = await this.shoppingCartService.getShoppingCart();
  }

  logout() {
    this.authService.logout();
  }
}
