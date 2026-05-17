import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, switchMap } from 'rxjs';

export const adminAuthGuard: CanActivateFn = (
  route,
  state,
): Observable<boolean> => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  return authService.user$.pipe(
    switchMap((user) => userService.get(user?.uid ?? null)),
    map((user) => user?.isAdmin ?? false),
  );
};
