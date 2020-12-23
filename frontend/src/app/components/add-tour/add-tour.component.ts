import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OccasionService } from '../../_services/occasion.service';
import { Occasion } from '../tour-list/occasion'
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent {
  accessError = "";
  title = "Add tour"
  
  profileForm = this.tb.group({
    name: ['', Validators.required],
    destination: [''],
    start_date: [''],
    end_date: [''],
    price: [''],
    seats: [''],
    seats_taken: [''],
    description: [''],
    pic_link: [''],
    gallery1: [''],
    gallery2: [''],
    gallery3: [''],
    gallery4: [''],


  });
  addTour(): void {

    if (!this.profileForm.value) { return; }
    console.log(this.profileForm.value)
    this.tourService.addOccasion(this.profileForm.value as Occasion)
      .subscribe(tour => {
        console.log(tour)
        
      });
    window.alert("New tour added!");
  }
  

  constructor(private tb: FormBuilder, private tourService: OccasionService, private userService: UserService) {
    

    this.userService.getModeratorBoard().subscribe(
      data => {},
      err => {this.accessError = err.error;}
    );
  }
}
