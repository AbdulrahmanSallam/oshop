import { inject, Injectable } from '@angular/core';
import { Database, objectVal, push, remove } from '@angular/fire/database';
import { ref, update } from 'firebase/database';
import { Product } from '../models/Product';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { ShoppingCart, ShoppingCartData } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly CART_STORAGE_KEY = 'cartId';
  private readonly CART_PATH = '/shopping-cart';
  private readonly db = inject(Database);

  // Make cartId reactive so we can track when it changes
  private cartId$ = new BehaviorSubject<string | null>(
    localStorage.getItem(this.CART_STORAGE_KEY),
  );

  getShoppingCart() {
    // React to cartId changes and create new observable for the new cart
    return this.cartId$.pipe(
      switchMap((cartId) => {
        if (!cartId) {
          return new BehaviorSubject<ShoppingCart | null>(null);
        }
        const cartRef = ref(this.db, `${this.CART_PATH}/${cartId}`);
        return objectVal<ShoppingCartData | null>(cartRef).pipe(
          map((shoppingCart: ShoppingCartData | null) => {
            if (shoppingCart) {
              return new ShoppingCart(
                shoppingCart.dateCreated,
                shoppingCart.items,
              );
            }
            return null;
          }),
        );
      }),
    );
  }

  async addToCart(product: Product) {
    await this.getOrCreateCartId();

    const shoppingCartItemRef = await this.getShoppingCartItemRef(product.key!);
    const item$ = objectVal<ShoppingCartItem | null>(shoppingCartItemRef);

    item$.pipe(take(1)).subscribe(async (shoppingCartItem) => {
      if (!shoppingCartItem) {
        await update(shoppingCartItemRef, {
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
        return;
      }

      const shoppingItem = new ShoppingCartItem({
        ...shoppingCartItem,
        key: product.key!,
      });

      await this.updateQuantity(shoppingItem, 1);
    });
  }

  async updateQuantity(shoppingCartItem: ShoppingCartItem, value: number) {
    const newQuantity = shoppingCartItem.quantity + value;
    const shoppingCartItemRef = await this.getShoppingCartItemRef(
      shoppingCartItem.key,
    );

    if (newQuantity <= 0) {
      return await remove(shoppingCartItemRef);
    }

    return await update(shoppingCartItemRef, {
      quantity: newQuantity,
    });
  }

  async removeFromCart(product: Product) {
    const cartItemRef = await this.getShoppingCartItemRef(product.key!);
    return await remove(cartItemRef);
  }

  async clearCart() {
    const cartRef = await this.getShoppingCartRef();
    await remove(cartRef);

    // Clear cart ID and notify observers
    localStorage.removeItem(this.CART_STORAGE_KEY);
    this.cartId$.next(null);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem(this.CART_STORAGE_KEY);

    if (cartId) {
      const shoppingCartRef = ref(this.db, `${this.CART_PATH}/${cartId}`);
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

    const newCartId = result.key!;
    localStorage.setItem(this.CART_STORAGE_KEY, newCartId);
    this.cartId$.next(newCartId); // Notify that cart ID changed
    return newCartId;
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
