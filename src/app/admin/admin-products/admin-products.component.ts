import { Component, inject } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
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
  destroy$ = new Subject<void>();

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      columns: [
        {
          title: 'Title',
          data: 'name',
          width: '20%',
          className: 'text-center',
        },
        {
          title: 'Price',
          data: 'price',
          width: '20%',
          className: 'text-center',
        },
        {
          title: 'Category',
          data: 'category',
          width: '20%',
          className: 'text-center',
        },
        {
          title: '',
          orderable: false,
          searchable: false,
          width: '20%',
          className: 'text-center',
        },
        {
          title: '',
          orderable: false,
          searchable: false,
          width: '20%',
          className: 'text-center',
        },
      ],
    };

    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.dtTrigger.next(null);
      });
  }

  delete(id: string | undefined) {
    if (!id) return;
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
