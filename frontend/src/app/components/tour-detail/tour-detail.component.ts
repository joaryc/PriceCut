import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Occasion } from '../tour-list/occasion';
import { OccasionService } from '../../_services/occasion.service';
import { CartService } from '../../_services/cart.service';


@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  @Input() tour: Occasion;
  @Output() valueChanged = new EventEmitter<number>();
  @Output() deleteTour = new EventEmitter<Occasion>();
  @Output() newComment = new EventEmitter();
  @Input() user;
  @Input() isLoggedIn;
  @Input() showModeratorBoard;
  username="";
  tours;
  selectedTour: boolean;
  rate: number;


  constructor(
    private cartService: CartService,
    private tourService: OccasionService
  ) {
    this.getTours();
  }
  ngOnInit(): void {
    if(this.user)this.username = this.user.username;
  }
  getTours(): void {
    this.tourService.getOccasions()
      .subscribe(tours => this.tours = tours);
  }
  onSelectPlus(tour: Occasion, user): void {
    this.selectedTour = true;
    this.valueChanged.emit(1);
    this.addToCart(tour, user)
    
  }
  delete(tour: Occasion): void {
    this.tours = this.tours.filter(h => h !== tour);
    this.tourService.deleteTour(tour).subscribe();
    window.alert("The tour" + tour.title + "was deleted");
  }

  newCommentCreated(comment) {
    this.newComment.emit(comment);
    window.alert("Thank you, you're opinion is saved!");
  }
  addToCart(product, user) {
    let cartProduct = {
      occasionId: product._id,
      userId: user.id
    }
    this.cartService.create(JSON.stringify(cartProduct)).subscribe(newCartObject => { });
    window.alert('Your product has been added to the cart!');
  }

}
