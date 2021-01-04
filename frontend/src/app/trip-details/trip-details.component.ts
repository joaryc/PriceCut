import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from '../trips.service';
import { Trip } from '../types';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  id: string;
  private sub: any;
  trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripsService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tripService.getTrip(this.id)
        .subscribe(trip => {
          this.trip = trip
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
