import { inject, Injectable } from '@angular/core';
import { Database, listVal } from '@angular/fire/database';
import { ref } from 'firebase/database';

export interface Category {
  name: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  db = inject(Database);

  getAll() {
    const categoryRef = ref(this.db, '/categories/');
    return listVal<Category>(categoryRef, {
      keyField: 'key',
    });
  }
}
