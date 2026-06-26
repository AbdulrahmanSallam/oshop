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
