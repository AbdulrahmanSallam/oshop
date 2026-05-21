import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category, CategoryService } from 'src/app/services/category.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  router = inject(Router);

  private destroy$ = new Subject<void>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => this.categoryValidator(control),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-\.~!$&'()*+,;=:@%?]*)*$/i,
      ),
    ]),
  });

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.categories = v;
        this.category.updateValueAndValidity();
      });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productService
      .create(this.form.value as Product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['admin/products']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  categoryValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const exists = this.categories.some(
      (category) => category.key === control.value,
    );

    return exists ? null : { invalidCategory: true };
  }

  // helpers
  get name() {
    return this.form.controls.name;
  }

  get price() {
    return this.form.controls.price;
  }
  get category() {
    return this.form.controls.category;
  }

  get imageUrl() {
    return this.form.controls.imageUrl;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
