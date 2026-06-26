import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { map, switchMap } from 'rxjs';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  return authService.user$.pipe(
    switchMap((uid) => userService.get(uid)),
    map((appUser) => {
      if (appUser?.isAdmin) {
        return true;
      }
      router.navigate(['/']);
      return false;
    }),
  );
};
