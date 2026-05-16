import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './layout/bs-navbar/bs-navbar.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AsyncPipe } from '@angular/common';

const firebaseConfig = {
  apiKey: 'AIzaSyCx0XT9h0wtZX1aHYXDxTPPoDpXYJPUMN4',
  authDomain: 'oshop-82008.firebaseapp.com',
  projectId: 'oshop-82008',
  storageBucket: 'oshop-82008.firebasestorage.app',
  messagingSenderId: '802148367215',
  appId: '1:802148367215:web:3798e608a364c24a0c869a',
  measurementId: 'G-WT9VSTQ241',
};

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
