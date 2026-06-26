import { ShoppingCartItem } from 'shared/models/ShoppingCartItem';

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
    return this.cartItems.reduce((total, cartItem) => {
      return total + cartItem.totalPrice;
    }, 0);
  }

  get totalItemCount() {
    return this.cartItems.reduce((count, cartItem) => {
      return count + cartItem.quantity;
    }, 0);
  }
}
