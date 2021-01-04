import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TRIPS } from './constants';
import { Trip } from './types';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    return {
      trips: TRIPS
    }
  }

  constructor() { }
}
