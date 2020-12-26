import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../_services/favourite.service';
import { OccasionService } from '../../_services/occasion.service';
import { TokenStorageService } from '../../_services/token-storage.service';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  currentUser: any;
  items = [];
  sum = 0;
  
  constructor(
    private favouriteService: FavouriteService,
    private token: TokenStorageService,
    private tourService: OccasionService,

  ) { this.getData(); }

  getData() {
    this.currentUser = this.token.getUser();
    this.favouriteService.get(this.currentUser.id).subscribe(favouriteObjects => {
      for (let obj of favouriteObjects) {
        this.tourService.getOccasion(obj.tourId).subscribe(tour => {
          this.items.push({ tour: tour, favouriteObjId: obj._id, active: true });
          this.sum += tour.price
        });
      }
    })
  }

  delete(favouriteItem) {
    window.alert("Reservation deleted!");
    favouriteItem.active = false;
    this.sum -= favouriteItem.tour.price
    this.favouriteService.delete(favouriteItem.favouriteObjId,this.currentUser.id).subscribe(data => { console.log(data) });
  }

}






