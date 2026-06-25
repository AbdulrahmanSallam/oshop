import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Product, ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly shoppingCartService = inject(ShoppingCartService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  shoppingCart$!: Observable<ShoppingCart | null>; // Remove the null union type
  category = '';

  destroy$ = new Subject<void>();

  async ngOnInit() {
    // Load products and handle filtering
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.activatedRoute.queryParamMap;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((param) => {
        this.category = param.get('category') ?? '';
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

    // Subscribe to cart changes reactively - remove null assignment
    this.shoppingCart$ = (
      await this.shoppingCartService.getShoppingCart()
    ).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
