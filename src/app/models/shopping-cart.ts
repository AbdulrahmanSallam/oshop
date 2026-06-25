import { ShoppingCartItem } from '../services/shopping-cart.service';

export interface ShoppingCartData {
  dateCreated: number;
  items: { [productId: string]: ShoppingCartItem };
}

export class ShoppingCart implements ShoppingCartData {
  cartItems: ShoppingCartItem[] = [];

  constructor(
    public dateCreated: number,
    public items: { [productId: string]: ShoppingCartItem } = {},
  ) {
    for (let productId in items) {
      let item = items[productId];
      // Create ShoppingCartItem with key properly set
      this.cartItems.push(
        new ShoppingCartItem({
          ...item,
          key: productId,
        }),
      );
    }
  }

  getItem(productId: string) {
    return (
      this.cartItems.find((cartItem) => cartItem.key === productId) ?? null
    );
  }

  get totalPrice() {
    let totalPrice = 0;
    this.cartItems.map((cartItem) => {
      totalPrice += cartItem.totalPrice;
    });
    return totalPrice;
  }
  get totalItemCount() {
    let count = 0;
    this.cartItems.map((cartItem) => {
      count += cartItem.quantity;
    });

    return count;
  }
}
