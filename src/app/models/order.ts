import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: OrderItem[] = [];

  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingCart: ShoppingCart,
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.cartItems.map(
      (i) =>
        new OrderItem(
          i.quantity,
          i.totalPrice,
          new OrderProduct(i.name, i.imageUrl, i.price),
        ),
    );
  }
}

export class OrderItem {
  constructor(
    public quantity: number,
    public totalPrice: number,
    public proudct: OrderProduct,
  ) {}
}

export class OrderProduct {
  constructor(
    public name: string,
    public imageUrl: string,
    public price: number,
  ) {}
}

export interface Shipping {
  name: string;
  address: string;
  city: string;
}
