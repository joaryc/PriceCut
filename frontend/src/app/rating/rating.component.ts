import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TRIPS } from '../constants';
import { TripComponent } from '../trip/trip.component';
import { Trip } from '../types';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() trip: Trip;
  selected = 0;
  hovered = 0;
  readonly = false;
  constructor() { }

  ngOnInit(): void {
  }

}
