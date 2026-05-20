import { inject, Injectable } from '@angular/core';
import { Database, listVal } from '@angular/fire/database';
import { onValue, ref } from 'firebase/database';
import { Observable, shareReplay } from 'rxjs';

export interface Category {
  name: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  db = inject(Database);

  constructor() {}

  getCategories() {
    const categoryRef = ref(this.db, '/categories/');
    return listVal<Category>(categoryRef, {
      keyField: 'key',
    });
  }
}
