import { inject, Injectable } from '@angular/core';
import {
  Database,
  listVal,
  objectVal,
  push,
  remove,
  update,
} from '@angular/fire/database';
import { ref } from 'firebase/database';
import { Observable } from 'rxjs';

export interface Product {
  name: string | null;
  price: number | null;
  category: string | null;
  imageUrl: string | null;
  key?: string;
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

  getAll(): Observable<Product[]> {
    const productsRef = ref(this.db, '/products/');
    return listVal(productsRef, { keyField: 'key' });
  }
  get(id: string): Observable<Product | null> {
    const productRef = ref(this.db, `/products/${id}`);
    return objectVal(productRef);
  }

  update(id: string, product: Product) {
    const productRef = ref(this.db, `/products/${id}`);
    update(productRef, product);
  }

  delete(id: string) {
    const productRef = ref(this.db, `/products/${id}`);
    remove(productRef);
  }
}
