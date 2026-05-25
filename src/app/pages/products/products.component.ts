import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private activatedRoute = inject(ActivatedRoute);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$ = this.categoryService.getAll();

  category = '';

  ngOnInit(): void {
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
          ? this.products.filter(
              (p) =>
                p.category.toLocaleLowerCase() ===
                this.category.toLocaleLowerCase(),
            )
          : this.products;
      });
  }
}
