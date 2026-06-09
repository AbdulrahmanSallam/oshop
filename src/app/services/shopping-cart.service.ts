import { inject, Injectable } from '@angular/core';
import { Database, objectVal, push, remove } from '@angular/fire/database';
import { ref, update } from 'firebase/database';
import { Product } from './product.service';
import { map, take } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class ShoppingCart {
  constructor(
    public items: { [key: string]: CartItem },
    public dateCreated: number,
  ) {}

  get TotalItemCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }

    return count;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly CART_STORAGE_KEY = 'cartId';
  private readonly CART_PATH = '/shopping-cart/';
  private readonly db = inject(Database);

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    const cartRef = this.getCartRef(cartId);
    return objectVal<ShoppingCart>(cartRef).pipe(
      map((val) =>
         new ShoppingCart(val.items, val.dateCreated)
      ),
    );
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItemRef(cartId, product.key!);

    let item$ = objectVal<CartItem | null>(itemRef);

    item$.pipe(take(1)).subscribe((item) => {
      if (!item) {
        return update(itemRef, { product, quantity: 1 });
      }

      return update(itemRef, { quantity: item.quantity + 1 });
    });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItemRef(cartId, product.key!);

    let item$ = objectVal<CartItem | null>(itemRef);

    item$.pipe(take(1)).subscribe((item) => {
      if (!item) {
        return;
      }

      if (item.quantity === 1) {
        return remove(itemRef);
      }

      return update(itemRef, { quantity: item.quantity - 1 });
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem(this.CART_STORAGE_KEY);

    if (cartId) return cartId;

    const shoppingCartsRef = ref(this.db, this.CART_PATH);

    let result = await push(shoppingCartsRef, {
      dateCreated: new Date().getTime(),
    });

    localStorage.setItem('cartId', result.key!);

    return result.key!;
  }

  private getCartRef(cartId: string) {
    return ref(this.db, `/shopping-cart/${cartId}`);
  }
  private getItemRef(cartId: string, productId: string) {
    return ref(this.db, `/shopping-cart/${cartId}/items/${productId}`);
  }
}
