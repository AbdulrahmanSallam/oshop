import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

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
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DataTablesModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
