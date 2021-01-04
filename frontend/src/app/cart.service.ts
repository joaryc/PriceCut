import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartEntry, OrderHistoryEntry, Trip } from './types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addToCart(product: Trip) {
    const cartEntry: CartEntry = {
      seats: 1,
      trip: product,
    };
    return this.getCurrentUserDoc().collection('cart').add(cartEntry);
  }

  getItems() {
    return this.getCurrentUserDoc().collection('cart').valueChanges();
  }

  getItemsCollection() {
    return this.getCurrentUserDoc().collection('cart');
  }

  clearCart() {
    return this.getCurrentUserDoc()
      .collection('cart')
      .get()
      .toPromise()
      .then((data) => {
        data.docs.forEach((doc) => doc.ref.delete());
      });
  }

  removeFromCart(itemId: string) {
    return this.getCurrentUserDoc()
      .collection('cart')
      .get()
      .toPromise()
      .then((data) => {
        const docToDelete = data.docs.find((doc) => doc.id);
        if (docToDelete) {
          docToDelete.ref.delete();
        }
      });
  }

  private getCurrentUserDoc() {
    return this.firestore.doc(`users/${this.us.uid}`);
  }

  constructor(private us: UserService, private firestore: AngularFirestore) {}
}
