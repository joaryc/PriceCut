import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OccasionService } from '../../_services/occasion.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  name ='a';
  occasionID;
  occasion;
  constructor(
    private route: ActivatedRoute,
    private occasionService: OccasionService
  ) { 
    
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {      
    this.name = params['name']
    this.occasionID = params["occasionId"];
    this.getOccasion(this.occasionID)
    
  })}
  getOccasion(occasionId): void {
    this.occasionService.getOccasion(occasionId)
      .subscribe(occasion => {
        this.occasion = occasion
        console.log(occasion);
      });
  }

}
