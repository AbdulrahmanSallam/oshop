import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  isLoading = false;

  login() {
    this.isLoading = true;
    this.authService.login();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
