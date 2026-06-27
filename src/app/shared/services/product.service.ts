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
import { Product } from 'shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  db = inject(Database);

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
