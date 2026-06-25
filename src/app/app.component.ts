import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      // if (!user) this.router.navigate(['/login']);
    });
  }
}
