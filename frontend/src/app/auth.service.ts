import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/index';

type User = firebase.User;

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = this.auth.authState;

  constructor(private auth: AngularFireAuth) { }

  get user(): Observable<User | null> {
    return this.auth.user;
  }

  login({ email, password }: Credentials) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password }: Credentials) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

}