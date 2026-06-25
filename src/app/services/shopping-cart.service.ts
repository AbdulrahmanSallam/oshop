import { inject, Injectable } from '@angular/core';
import { Database, objectVal, push, remove } from '@angular/fire/database';
import { ref, update } from 'firebase/database';
import { Product } from './product.service';
import { map, take } from 'rxjs';
import { ShoppingCart, ShoppingCartData } from '../models/shopping-cart';

export class ShoppingCartItem {
  key!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  name!: string;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price! * this.quantity;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly CART_STORAGE_KEY = 'cartId';
  private readonly CART_PATH = '/shopping-cart';
  private readonly db = inject(Database);

  async getShoppingCart() {
    const cartRef = await this.getShoppingCartRef();
    return objectVal<ShoppingCartData | null>(cartRef).pipe(
      map((shoppingCart) => {
        if (shoppingCart) {
          return new ShoppingCart(shoppingCart.dateCreated, shoppingCart.items);
        }
        return null;
      }),
    );
  }

  async addToCart(product: Product) {
    // set cartId in local storage
    await this.getOrCreateCartId();

    const shoppingCartItemRef = await this.getShoppingCartItemRef(product.key!);
    let item$ = objectVal<ShoppingCartItem | null>(shoppingCartItemRef);

    item$.pipe(take(1)).subscribe((shoppingCartItem) => {
      if (!shoppingCartItem) {
        return update(shoppingCartItemRef, {
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }

      let shoppingItem = new ShoppingCartItem({
        ...shoppingCartItem,
        key: product.key!,
      });

      return this.updateQuantity(shoppingItem, 1);
    });
  }

  async removeFromCart(product: Product) {
    const cartItemRef = await this.getShoppingCartItemRef(product.key!);
    return remove(cartItemRef);
  }

  async updateQuantity(shoppingCartItem: ShoppingCartItem, value: number) {
    const newQuantity = shoppingCartItem.quantity + value;
    const shoppingCartItemRef = await this.getShoppingCartItemRef(
      shoppingCartItem.key,
    );

    // If quantity would be 0 or less, remove the item from cart
    if (newQuantity <= 0) {
      return remove(shoppingCartItemRef);
    }

    // Otherwise update the quantity
    return update(shoppingCartItemRef, {
      quantity: newQuantity,
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem(this.CART_STORAGE_KEY);

    if (cartId) {
      const shoppingCartRef = ref(this.db, `${this.CART_PATH}/${cartId}`);
      // Convert to promise for cleaner async handling
      const value = await objectVal<ShoppingCartData | null>(shoppingCartRef)
        .pipe(take(1))
        .toPromise();

      if (value) {
        return cartId;
      }
    }

    // Create new shopping cart
    const shoppingCartBaseRef = ref(this.db, this.CART_PATH);
    const result = await push(shoppingCartBaseRef, {
      dateCreated: new Date().getTime(),
    });

    localStorage.setItem(this.CART_STORAGE_KEY, result.key!);
    return result.key!;
  }

  private async getShoppingCartRef() {
    const cartId = localStorage.getItem(this.CART_STORAGE_KEY);
    return ref(this.db, `${this.CART_PATH}/${cartId}`);
  }

  private async getShoppingCartItemRef(cartItemId: string) {
    const cartId = localStorage.getItem(this.CART_STORAGE_KEY);
    return ref(this.db, `${this.CART_PATH}/${cartId}/items/${cartItemId}`);
  }
}
