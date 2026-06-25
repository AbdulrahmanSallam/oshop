import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Product } from 'src/app/services/product.service';
import {
  ShoppingCartItem,
  ShoppingCartService,
} from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  shoppingCartService = inject(ShoppingCartService);

  @Input({ required: true, alias: 'product' }) product!: Product;
  @Input({ required: true, alias: 'show-actions' }) showActions!: boolean;
  @Input({ alias: 'shoppingCart$' })
  shoppingCart$!: Observable<ShoppingCart | null>;

  shoppingCartItem: ShoppingCartItem | null = null;
  private destroy$ = new Subject<void>();

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  ngOnInit(): void {
    if (this.shoppingCart$) {
      this.shoppingCart$.pipe(takeUntil(this.destroy$)).subscribe((cart) => {
        if (cart) {
          this.shoppingCartItem = cart.getItem(this.product.key!);
        } else {
          this.shoppingCartItem = null;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
