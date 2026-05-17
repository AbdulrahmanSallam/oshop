import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/models/app-user';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  authService = inject(AuthService);
  appUser: AppUser | null = null;

  ngOnInit(): void {
    this.authService.appUser$.subscribe((user) => (this.appUser = user));
  }

  logout() {
    this.authService.logout();
  }
}
