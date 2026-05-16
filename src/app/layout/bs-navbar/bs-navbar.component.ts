import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  afAuth = inject(AngularFireAuth);

  user!: firebase.default.User | null;

  ngOnInit(): void {
    this.afAuth.authState.subscribe((x) => {
      this.user = x;
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
