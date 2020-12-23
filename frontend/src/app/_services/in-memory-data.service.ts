 import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Tour } from '../components/tour-list/tours';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tours = [
      { id: 0,name: 'name1', destination: 'destination1', start_date:  new Date("2021-01-12").getTime(), end_date: new Date("2021-01-20").getTime(),
        price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 5},
      { id: 1,name: 'name2', destination: 'destination2', start_date:  new Date("2021-01-16").getTime(), end_date: new Date("2021-01-20").getTime(),
      price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 0},
      { id: 2,name: 'name3', destination: 'destination3', start_date:  new Date("2021-02-16").getTime(), end_date: new Date("2021-03-16").getTime(),
        price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 2.5},
      { id: 3,name: 'name4', destination: 'destination3', start_date:  new Date("2021-03-16").getTime(), end_date: new Date("2021-04-16").getTime(),
        price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 5},
      { id: 5,name: 'name6', destination: 'destination3', start_date:  new Date("2021-04-16").getTime(), end_date: new Date("2021-04-20").getTime(),
      price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 3},
      { id: 6,name: 'name7', destination: 'destination1', start_date:  new Date("2021-05-16").getTime(), end_date: new Date("2021-09-16").getTime(),
        price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 2},
      { id: 7,name: 'name8', destination: 'destination2', start_date:  new Date("2021-06-16").getTime(), end_date: new Date("2021-08-16").getTime(),
      price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 1},
      { id: 8,name: 'name9', destination: 'destination3', start_date:  new Date("2021-07-16").getTime(), end_date: new Date("2021-07-20").getTime(),
        price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 2},
      { id: 9,name: 'name10', destination: 'destination1', start_date:  new Date("2021-02-16").getTime(), end_date: new Date("2021-02-20").getTime(),
      price: Math.floor(Math.random() * 1000) + 1 , seats: 20, description: 'description', pic_link: 'https://picsum.photos/800', seats_taken: 0, rate: 3},
      
      
  ];
    return {tours};
  }

  // Overrides the genId method to ensure that a tour always has an id.
  // If the tours array is empty,
  // the method below returns the initial number (11).
  // if the tours array is not empty, the method below returns the highest
  // tour id + 1.
  genId(tours: Tour[]): number {
    return tours.length > 0 ? Math.max(...tours.map(tour => tour._id)) + 1 : 11;
  }
} 