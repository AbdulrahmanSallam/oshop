import { Component, inject, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  private categoryService = inject(CategoryService);

  @Input('category') category!: string;
  categories$ = this.categoryService.getAll();
}
