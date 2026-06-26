import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DatePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrderItemComponent } from 'shared/components/order-item/order-item.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderItemComponent,
  ],
  exports: [ProductCardComponent, ProductQuantityComponent, OrderItemComponent],
  providers: [AsyncPipe, CurrencyPipe, DatePipe],
  imports: [CommonModule],
})
export class SharedModule {}
