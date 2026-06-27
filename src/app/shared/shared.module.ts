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
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderItemComponent,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderItemComponent,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
  ],
  providers: [AsyncPipe, CurrencyPipe, DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
})
export class SharedModule {}
