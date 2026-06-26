import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingCartSummaryComponent } from './components/shipping-cart-summary/shipping-cart-summary.component';
import { ShippingFromComponent } from './components/shipping-from/shipping-from.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from 'shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShippingCartSummaryComponent,
    ShippingFromComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingModule {}
