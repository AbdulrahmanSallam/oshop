import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categoryService = inject(CategoryService);
  productService = inject(ProductService);

  categories$ = this.categoryService.getCategories();

  ngOnInit(): void {}

  save(product: Product) {
    this.productService.create(product);
  }
}
