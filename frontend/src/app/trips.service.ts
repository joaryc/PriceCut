import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { TRIPS } from './constants';
import { BaseTrip, Trip } from './types';

const TRIPS_STORAGE_KEY = 'savedTrips';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getTrips(): Observable<Trip[]> {
    return this.firestore
      .collection('trips')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as BaseTrip;
            const id = a.payload.doc.id;
            return {
              id,
              ...data,
              startDate: data.startDate.toDate(),
              endDate: data.endDate.toDate(),
            };
          })
        )
      );
  }

  getTrip(id: string): Observable<Trip> {
    return this.firestore
      .doc<BaseTrip>(`trips/${id}`)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          const documentId = action.payload.id;

          return {
            ...data,
            id: documentId,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
          };
        })
      );
  }

  deleteTrip(trip: Trip): Promise<void> {
    return this.firestore.doc(`trips/${trip.id}`).delete();
  }

  addTrip(trip: BaseTrip): Promise<DocumentReference<BaseTrip>> {
    return this.firestore.collection<BaseTrip>('trips').add(trip);
  }

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}
}
