import firebase from 'firebase/app';
export interface BaseTrip {
  name: string;
  country: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  price: number;
  seats: number;
  description: string;
  photoUrl: string;
  rating: number;
  category: string;
}

export interface Trip {
  id: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  seats: number;
  description: string;
  photoUrl: string;
  rating: number;
  category: string;
}

export type Destination = 'polska' | 'zagranica';

export type TripFilter =
  | { type: 'priceFrom'; value: number }
  | { type: 'priceTo'; value: number }
  | { type: 'dateFrom'; value: Date }
  | { type: 'dateTo'; value: Date }
  | { type: 'ratingFrom'; value: number }
  | { type: 'ratingTo'; value: number }
  | { type: 'destination'; value: Destination };

export interface FilterObject {
  priceFrom?: number;
  priceTo?: number;
  dateFrom?: Date;
  dateTo?: Date;
  ratingFrom?: number;
  ratingTo?: number;
  destination?: Destination;
}

export interface OrderHistoryEntry {
  timestamp: number;
  trip: Trip;
  rating: number;
}

export interface CartEntry {
  trip: Trip;
  seats: number;
}

export interface User {
  cart: Trip[];
  orders: OrderHistoryEntry[];
}
