import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(public afa: AngularFireAuth) { }

  public login(email: string, password: string) {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  public logout() {
    return this.afa.auth.signOut();
  }
}
