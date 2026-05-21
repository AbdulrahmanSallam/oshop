import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  productService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.filteredProducts = this.products = products;
      });
  }

  filter(query: string) {
    console.log(this.filteredProducts);
    this.filteredProducts = query
      ? this.products.filter((product) =>
          product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        )
      : this.products;
  }

  delete(id: string) {
    if (!confirm('Are you sure to Delete this product?')) {
      return;
    }

    this.productService.delete(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
