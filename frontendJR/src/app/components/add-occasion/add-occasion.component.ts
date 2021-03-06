import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OccasionService } from '../../_services/occasion.service';
import { Occasion } from '../occasion-list/occasion'
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-add-occasion',
  templateUrl: './add-occasion.component.html',
  styleUrls: ['./add-occasion.component.css']
})
export class AddOccasionComponent {
  accessError = "";
  title = "Add occasion"
  
  constructor(private fb: FormBuilder,  private occasionService: OccasionService, private userService: UserService){
    this.userService.getUserBoard().subscribe(
        data => {},
        err => {this.accessError = err.error;}
      );
  };

  newOccasionForm = this.fb.group({
    title: ['', Validators.required],
    start_date: [''],
    end_date: [''],
    price: [''],
    description: [''],
    occasion_link: [''],
    pic_link: [''],
    gallery1: [''],
    gallery2: [''],
    gallery3: [''],
    gallery4: [''],


  });

  addOccasion(): void {

    if (!this.newOccasionForm.value) { return; }
    this.occasionService.addOccasion(this.newOccasionForm.value as Occasion)
      .subscribe(occasion => {
        console.log(occasion)        
    });
    window.alert("New occasion added!");
  }
}

