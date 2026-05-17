import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  user$ = authState(this.auth);

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider).then((result) => {
      if (result.user) {
        this.userService.save(result.user);
      }
      this.router.navigateByUrl(returnUrl);
    });
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$() {
    return this.user$.pipe(
      // switchMap((user) => this.userService.get(user?.uid ?? null)),
      switchMap((user) => this.userService.watch(user?.uid ?? null)), // this realtime
    );
  }
}
