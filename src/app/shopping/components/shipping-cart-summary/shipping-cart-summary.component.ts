import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-cart-summary',
  templateUrl: './shipping-cart-summary.component.html',
  styleUrls: ['./shipping-cart-summary.component.scss'],
})
export class ShippingCartSummaryComponent {
  @Input() cart!: ShoppingCart | null;
}
