import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { OrderHistoryService } from '../order-history.service';
import { CartEntry, Trip } from '../types';

type CartEntryWithId = CartEntry & { id: string };

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items: CartEntryWithId[];
  modalVisible: boolean = false;
  cartEntryPresentedByModal: CartEntryWithId | undefined;

  showConfirmationModal(item: CartEntryWithId) {
    this.cartEntryPresentedByModal = item;
    this.modalVisible = true;
  }

  deleteItemsFromCart(): void {
    this.cartService.clearCart();
  }

  close() {
    this.modalVisible = false;
    this.cartEntryPresentedByModal = undefined;
  }

  addToHistory() {
    this.orderHistoryService
      .addToHistory(this.cartEntryPresentedByModal.trip)
      .then(() => {
        this.cartService.removeFromCart(this.cartEntryPresentedByModal.id);
        this.close();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  constructor(
    private cartService: CartService,
    private orderHistoryService: OrderHistoryService
  ) {
    cartService
      .getItemsCollection()
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as CartEntry;
            const id = a.payload.doc.id;
            return {
              id,
              ...data,
            };
          })
        )
      )
      .subscribe((data) => {
        this.items = data;
      });
  }
}
