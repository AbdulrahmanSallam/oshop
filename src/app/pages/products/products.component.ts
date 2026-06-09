import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  Subscriber,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Product, ProductService } from 'src/app/services/product.service';
import {
  ShoppingCart,
  ShoppingCartService,
} from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly shoppingCart = inject(ShoppingCartService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart!: ShoppingCart;

  destroy$ = new Subject<void>();

  category = '';

  async ngOnInit() {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.activatedRoute.queryParamMap;
        }),
      )
      .subscribe((param) => {
        this.category = param.get('category') ?? '';
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

    (await this.shoppingCart.getCart())
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.cart = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
