import { inject, Injectable } from '@angular/core';
import { Database, push } from '@angular/fire/database';
import { ref } from 'firebase/database';

export interface Product {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  db = inject(Database);
  constructor() {}

  create(product: Product) {
    const productRef = ref(this.db, '/products/');

    push(productRef, product);
  }
}
