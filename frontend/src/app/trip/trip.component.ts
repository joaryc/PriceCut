import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Trip } from '../types';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  @Output() tripToDeleteEmmiter = new EventEmitter<Trip>();
  isAdmin = false;
  isLoggedIn = false;

  onDeletePress(): void {
    this.tripToDeleteEmmiter.emit(this.trip);
  }
  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Twój produkt dodano do koszyka!');
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
  ) {
    authService.user.subscribe((value) => {
      if (value) {
        value?.getIdTokenResult().then(token => this.isAdmin = !!token.claims.admin);
      } else {
        this.isAdmin = false;
      }
      this.isLoggedIn =!!value;
    })
  }
  ngOnInit(): void {}
}
