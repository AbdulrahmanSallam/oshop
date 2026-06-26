// Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

// Third-party Libraries
import { DataTablesModule } from 'angular-datatables';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';

// App Routing
import { AppRoutingModule } from './app-routing.module';

// App Component
import { AppComponent } from './app.component';

// Layout Components
import { NavbarComponent } from './layout/navbar/navbar.component';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

// Product Components
import { ProductCardComponent } from './pages/products/product-card/product-card.component';
import { ProductFilterComponent } from './pages/products/product-filter/product-filter.component';
import { ProductQuantityComponent } from './pages/products/product-quantity/product-quantity.component';

// Admin Components
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ShoppingCartSummaryComponent } from './pages/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFromComponent } from './pages/shipping-from/shipping-from.component';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCEZ1rJ-aN0WSsrjPBzFmADvcmBKRtQ7g',
  authDomain: 'oshop-f3a4f.firebaseapp.com',
  databaseURL:
    'https://oshop-f3a4f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'oshop-f3a4f',
  storageBucket: 'oshop-f3a4f.firebasestorage.app',
  messagingSenderId: '336245735473',
  appId: '1:336245735473:web:f11412ac1abb4bbeed9510',
  measurementId: 'G-QVHWVTZ493',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ShoppingCartSummaryComponent,
    ShippingFromComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [AsyncPipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
