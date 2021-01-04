import { Component, Input, OnInit } from '@angular/core';
import { OrderHistoryService } from '../order-history.service';
import { OrderHistoryEntry, Trip } from '../types';

@Component({
  selector: 'app-trip-confirmation',
  templateUrl: './trip-confirmation.component.html',
  styleUrls: ['./trip-confirmation.component.css']
})
export class TripConfirmationComponent implements OnInit {
  @Input() trip: Trip;

  addToHistory() {
    this.orderHisoryService.addToHistory(this.trip).then(() => {
      window.alert('Kupiłeś wycieczkę!');
    }).catch((e) => {
      console.log(e)
    })
  }

  constructor(
    private orderHisoryService: OrderHistoryService,
  ) { }

  ngOnInit(): void {
  }
}
