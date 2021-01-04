import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './types';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get user(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  get uid(): string | undefined {
    return firebase.auth().currentUser?.uid;
  }

  getUser(id: string): Observable<User> {
    return this.firestore
      .doc<User>(`/users/${id}`)
      .snapshotChanges()
      .pipe(map((action) => action.payload.data()));
  }

  addUser(uid: string, user: User): Promise<void> {
    return this.firestore.collection<User>('users').doc(uid).set(user);
  }

  constructor(private firestore: AngularFirestore) {}
}
