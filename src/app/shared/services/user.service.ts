import { Injectable, inject } from '@angular/core';
import { Database, ref, update, get, onValue } from '@angular/fire/database';
import { User } from 'firebase/auth';
import { from, map, Observable, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  db = inject(Database);

  save(user: User) {
    const userRef = ref(this.db, '/users/' + user.uid);
    return from(
      update(userRef, {
        name: user.displayName,
        email: user.email,
      }),
    );
  }

  get(uid: string | null) {
    if (!uid) return of(null);

    const userRef = ref(this.db, '/users/' + uid);
    return from(get(userRef)).pipe(
      map((snapshot) => {
        if (snapshot.exists()) {
          return { _id: uid, ...snapshot.val() } as AppUser;
        }
        return null;
      }),
    );
  }

  // realtime
  watch(uid: string | null) {
    if (!uid) return of(null);

    const userRef = ref(this.db, '/users/' + uid);
    return new Observable<AppUser | null>((subscriber) => {
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          // Add _id to the returned data
          subscriber.next({ _id: uid, ...snapshot.val() } as AppUser);
        } else {
          subscriber.next(null);
        }
      });

      // Cleanup when unsubscribed
      return () => unsubscribe();
    });
  }
}
