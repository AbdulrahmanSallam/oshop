import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fireAuth = inject(AngularFireAuth);

  login() {
    return this.fireAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider(),
    );
  }
}
