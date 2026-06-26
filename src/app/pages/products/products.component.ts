import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly router = inject(Router);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  shoppingCart$!: Observable<ShoppingCart | null>;
  category = '';

  destroy$ = new Subject<void>();

  ngOnInit() {
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

    this.shoppingCart$ = this.shoppingCartService
      .getShoppingCart()
      .pipe(takeUntil(this.destroy$));
  }

  clearFilter() {
    this.router.navigate(['/products']);
  }

  trackByProduct(index: number, product: Product): string {
    return product.key || index.toString();
  }

  getAnimationDelay(product: Product): string {
    const index = this.filteredProducts.indexOf(product);
    return `${index * 100}ms`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
