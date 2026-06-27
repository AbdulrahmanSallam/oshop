import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './core/not-found/not-found.component';
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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,

    AppRoutingModule,
    RouterModule.forRoot([{ path: '**', component: NotFoundComponent }]),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
