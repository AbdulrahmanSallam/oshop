import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.authService.user$.subscribe();
  }
}
