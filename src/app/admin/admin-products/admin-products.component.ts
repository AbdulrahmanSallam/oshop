import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly destroy$ = new Subject<void>();

  products: Product[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Modal state
  showDeleteModal = false;
  productToDelete: Product | null = null;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search products...',
        lengthMenu: 'Show _MENU_',
        info: 'Showing _START_ to _END_ of _TOTAL_',
        infoEmpty: 'No products',
        zeroRecords: 'No matching products',
        paginate: {
          first: '<i class="fas fa-angle-double-left"></i>',
          last: '<i class="fas fa-angle-double-right"></i>',
          previous: '<i class="fas fa-angle-left"></i>',
          next: '<i class="fas fa-angle-right"></i>',
        },
      },
      dom: '<"flex justify-between items-center mb-4 gap-4 flex-wrap"lf>rt<"flex justify-between items-center mt-4 gap-4 flex-wrap"ip>',
    };

    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.dtTrigger.next(null);
      });
  }

  confirmDelete(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  deleteProduct(): void {
    if (!this.productToDelete?.key) return;

    this.productService.delete(this.productToDelete.key);
    this.products = this.products.filter(
      (p) => p.key !== this.productToDelete?.key,
    );
    this.cancelDelete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.dtTrigger.unsubscribe();
  }
}
