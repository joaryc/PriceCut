import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { TripsService } from '../trips.service';
import { Destination, FilterObject, Trip, TripFilter } from '../types';
import { catchError, map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { AuthService } from '../auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

interface FiltersWithNGBDates {
  priceFrom?: number;
  priceTo?: number;
  dateFrom?: NgbDate;
  dateTo?: NgbDate;
  ratingFrom?: number;
  ratingTo?: number;
  destination?: Destination;
}

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  currentRate = 5;
  trips = [];
  numberOfItems = 0;
  filters: FiltersWithNGBDates = {};
  appliedFilters: FilterObject = {};
  loggedIn = false;
  isAdmin = false;

  applyFilters() {
    this.appliedFilters = {
      ...this.filters,
      dateFrom: this.filters.dateFrom
        ? new Date(
            this.filters.dateFrom.year,
            this.filters.dateFrom.month - 1,
            this.filters.dateFrom.day
          )
        : undefined,
      dateTo: this.filters.dateTo
        ? new Date(
            this.filters.dateTo.year,
            this.filters.dateTo.month - 1,
            this.filters.dateTo.day
          )
        : undefined,
    };
    console.log(this.appliedFilters);
  }

  clearFilters() {
    this.filters = {};
    this.appliedFilters = {};
  }

  deleteTrip(trip: Trip): void {
    this.trips = this.trips.filter((t) => t !== trip);
    this.tripSevice.deleteTrip(trip);
  }

  fetchTrips(): void {
    this.tripSevice.getTrips().subscribe((trips) => {
      this.trips = trips;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  constructor(
    private tripSevice: TripsService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    authService.user.subscribe((value) => {
      if (value) {
        cartService.getItems().subscribe((data) => {
          this.numberOfItems = data.length;
        });
        value
          ?.getIdTokenResult()
          .then((token) => (this.isAdmin = !!token.claims.admin));
      } else {
        this.isAdmin = false;
      }
      this.loggedIn = !!value;
    });
  }

  ngOnInit(): void {
    this.fetchTrips();
  }
}
