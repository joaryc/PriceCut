import { Pipe, PipeTransform } from '@angular/core';
import { Key } from 'protractor';
import { FilterObject, Trip, TripFilter } from './types';

@Pipe({
  name: 'filterTrips',
})
export class FilterPipe implements PipeTransform {
  transform(items: Trip[], filters: FilterObject): Trip[] {
    if (!items || !items.length) return [];

    return this.filterObjectToList(filters).reduce((remainingItems, filter) => {
      return this.applyFilter(remainingItems, filter);
    }, items);
  }

  filterObjectToList(filterObject: FilterObject): TripFilter[] {
    const tripFilters: TripFilter[] = [];
    for (const [key, value] of Object.entries(filterObject)) {
      if (value !== undefined && value !== null) {
        // @ts-ignore
        tripFilters.push({ type: key, value });
      }
    }
    return tripFilters;
  }

  applyFilter(items: Trip[], filter: TripFilter): Trip[] {
    switch (filter.type) {
      case 'dateFrom':
        return this.filterDateFrom(items, filter.value);
      case 'dateTo':
        return this.filterDateTo(items, filter.value);
      case 'priceFrom':
        return this.filterPriceFrom(items, filter.value);
      case 'priceTo':
        return this.filterPriceTo(items, filter.value);
      case 'ratingFrom':
        return this.filterRatingsFrom(items, filter.value);
      case 'ratingTo':
        return this.filterRatingsTo(items, filter.value);
      case 'destination':
        return this.filterDestination(items, filter.value);
      default:
        return items;
    }
  }

  filterDateFrom(items: Trip[], value: Date): Trip[] {
    return this.filterDate(items, value, 'from');
  }

  filterDateTo(items: Trip[], value: Date): Trip[] {
    return this.filterDate(items, value, 'to');
  }

  filterDate(items: Trip[], value: Date, type: 'from' | 'to'): Trip[] {
    return items.filter((item) => {
      if (type === 'from') {
        return item.startDate.getTime() >= value.getTime();
      } else {
        return item.endDate.getTime() <= value.getTime();
      }
    });
  }

  filterPriceFrom(items: Trip[], value: number): Trip[] {
    return this.filterPrice(items, value, 'from');
  }

  filterPriceTo(items: Trip[], value: number): Trip[] {
    return this.filterPrice(items, value, 'to');
  }

  filterPrice(items: Trip[], value: number, mode: 'from' | 'to'): Trip[] {
    return items.filter((item) => {
      if (mode === 'from') {
        return item.price >= value;
      } else {
        return item.price <= value;
      }
    });
  }

  filterRatingsFrom(items: Trip[], value: number): Trip[] {
    return this.filterRatings(items, value, 'from');
  }

  filterRatingsTo(items: Trip[], value: number): Trip[] {
    return this.filterRatings(items, value, 'to');
  }

  filterRatings(items: Trip[], value: number, mode: 'from' | 'to'): Trip[] {
    return items.filter((item) => {
      if (mode === 'from') {
        return item.rating >= value;
      } else {
        return item.rating <= value;
      }
    });
  }

  filterDestination(items: Trip[], value: string): Trip[] {
    return items.filter((item) => item.category === value);
  }
}
