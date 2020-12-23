import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OccasionService } from '../../_services/occasion.service';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css']
})
export class TourViewComponent implements OnInit {
  name ='a';
  tourID;
  tour;
  constructor(
    private route: ActivatedRoute,
    private tourService: OccasionService
  ) { 
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
    this.name = params['name']
    this.tourID = params["tourId"];
    this.getTour(this.tourID)
    
  })}
  getTour(tourId): void {
    this.tourService.getOccasion(tourId)
      .subscribe(tour => {
        this.tour = tour
        console.log(tour);
      });
  }

}
