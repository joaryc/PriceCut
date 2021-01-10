import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Occasion } from '../occasion-list/occasion';
import { OccasionService } from '../../_services/occasion.service';
import { FavouriteService } from '../../_services/favourite.service';


@Component({
  selector: 'app-occasion-detail',
  templateUrl: './occasion-detail.component.html',
  styleUrls: ['./occasion-detail.component.css']
})
export class OccasionDetailComponent implements OnInit {
  @Input() occasion: Occasion;
  @Output() valueChanged = new EventEmitter<number>();
  @Output() deleteOccasion = new EventEmitter<Occasion>();
  @Output() newComment = new EventEmitter();
  @Input() user;
  @Input() isLoggedIn;
  @Input() showModeratorBoard;
  username="";
  occasions;
  selectedOccasion: boolean;
  rate: number;


  constructor(
    private favouriteService: FavouriteService,
    private occasionService: OccasionService
  ) {
    this.getOccasions();
  }
  ngOnInit(): void {
    if(this.user)this.username = this.user.username;
  }
  getOccasions(): void {
    this.occasionService.getOccasions()
      .subscribe(occasions => this.occasions = occasions);
  }
  onSelectPlus(occasion: Occasion, user): void {
    this.selectedOccasion = true;
    this.valueChanged.emit(1);
    this.addToFavourite(occasion, user)
    
  }
  delete(occasion: Occasion): void {
    this.occasions = this.occasions.filter(h => h !== occasion);
    this.occasionService.deleteOccasion(occasion).subscribe();
    window.alert("The occasion" + occasion.title + "was deleted");
  }

  newCommentCreated(comment) {
    this.newComment.emit(comment);
    window.alert("Thank you, you're opinion is saved!");
  }
  addToFavourite(product, user) {
    console.log(product);
    let favouriteProduct = {     
      occasionId: product._id,
      userId: user.id
    }
    console.log("product: " + favouriteProduct.occasionId );
    this.favouriteService.create(JSON.stringify(favouriteProduct),user.id).subscribe(newfavouriteObject => { });
    window.alert('Your product has been added to the favourite!');
  }

}
