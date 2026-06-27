import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/Product';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryService, Category } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  id: string | null = null;
  categories: Category[] = [];
  product: Product = {} as Product;
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    category: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => this.categoryValidator(control),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-.~!$&'()*+,;=:@%?]*)*$/i,
      ),
    ]),
  });

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.categoryService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
        this.category.updateValueAndValidity();
      });

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((product) => {
          if (!product) return;
          this.product = product;
          this.fillForm(this.product);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const productData = this.form.value as Product;

    if (this.id) {
      this.productService.update(this.id, productData);
    } else {
      this.productService.create(productData);
    }

    this.router.navigate(['/admin/products']);
  }

  reset() {
    if (!this.id) {
      this.form.reset({ price: 0 });
      return;
    }
    this.fillForm(this.product);
  }

  private fillForm(product: Product) {
    this.form.patchValue({
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
  }

  private categoryValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const exists = this.categories.some(
      (category) => category.key === control.value,
    );
    return exists ? null : { invalidCategory: true };
  }

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
}
