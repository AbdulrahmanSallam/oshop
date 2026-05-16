import { Injectable, inject } from '@angular/core';
import { Database, ref, update } from '@angular/fire/database';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  db = inject(Database);

  save(user: User) {
    const userRef = ref(this.db, '/users/' + user.uid);
    return update(userRef, {
      name: user.displayName,
      email: user.email,
    });
  }
}
