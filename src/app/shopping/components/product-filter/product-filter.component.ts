import { Component, inject, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  private categoryService = inject(CategoryService);

  @Input() category!: string;
  categories$ = this.categoryService.getAll();
}
