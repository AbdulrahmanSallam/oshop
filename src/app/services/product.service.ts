import { inject, Injectable } from '@angular/core';
import { Database, push } from '@angular/fire/database';
import { ref } from 'firebase/database';
import { Observable } from 'rxjs';

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

    return new Observable<void>((subscriber) => {
      push(productRef, product)
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }
}
