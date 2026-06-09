import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import {
  ShoppingCart,
  ShoppingCartService,
} from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly shoppingCartService = inject(ShoppingCartService);
  appUser: AppUser | null = null;

  cart$!: Observable<ShoppingCart>;

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => (this.appUser = user));

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
  }
}
