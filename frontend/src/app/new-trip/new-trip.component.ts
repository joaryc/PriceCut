import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TripsService } from '../trips.service';
import { Trip } from '../types';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
  today = new Date();
  checkoutForm = this.formBuilder.group({
    name: ['', Validators.required],
    country: ['', Validators.required],
    startDate: [{ year: this.today.getFullYear(), day: this.today.getDate(), month: this.today.getMonth() }],
    endDate: [{ year: this.today.getFullYear(), day: this.today.getDate(), month: this.today.getMonth() }],
    description: [''],
    photoUrl: [''],
    price: [0],
    seats: [0],
    rating: [0]
  });

  constructor(
    private formBuilder: FormBuilder,
    private tripSevice: TripsService,
    private location: Location,
  ) { }

  ngOnInit(): void { }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const startDate = new Date(this.checkoutForm.value.startDate.year, this.checkoutForm.value.startDate.month, this.checkoutForm.value.startDate.day);
    const endDate = new Date(this.checkoutForm.value.endDate.year, this.checkoutForm.value.endDate.month, this.checkoutForm.value.endDate.day);
    const newTrip = { ...this.checkoutForm.value, startDate, endDate }
    this.tripSevice.addTrip(newTrip).then(() => {
      this.goBack();
    })
  }

}
