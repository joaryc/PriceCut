import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { OccasionService } from '../../_services/occasion.service';
import { TokenStorageService } from '../../_services/token-storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  currentUser: any;
  items = [];
  sum = 0;
  
  constructor(
    private cartService: CartService,
    private token: TokenStorageService,
    private tourService: OccasionService,

  ) { this.getData(); }

  getData() {
    this.currentUser = this.token.getUser();
    this.cartService.get(this.currentUser.id).subscribe(cartObjects => {
      for (let obj of cartObjects) {
        this.tourService.getOccasion(obj.tourId).subscribe(tour => {
          this.items.push({ tour: tour, cartObjId: obj._id, active: true });
          this.sum += tour.price
        });
      }
    })
  }

  delete(cartItem) {
    window.alert("Reservation deleted!");
    cartItem.active = false;
    this.sum -= cartItem.tour.price
    this.cartService.delete(cartItem.cartObjId).subscribe(data => { console.log(data) });
  }

}






