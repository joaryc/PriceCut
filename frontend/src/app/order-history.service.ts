import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { OrderHistoryEntry, Trip } from './types';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  public pushEntry(entry: OrderHistoryEntry) {
    return this.getCurrentUserDoc().add(entry);
  }

  addToHistory(trip: Trip) {
    const order: OrderHistoryEntry = {
      trip,
      rating: null,
      timestamp: Date.now()
    };
    console.log(order)
    return this.getCurrentUserDoc().add(order);
  }

  public getEntries() {
    return this.getCurrentUserDoc().valueChanges();
  }

  private getCurrentUserDoc() {
    return this.firestore.doc(`users/${this.us.uid}`).collection('orders');
  }

  constructor(private us: UserService, private firestore: AngularFirestore) { }
}
