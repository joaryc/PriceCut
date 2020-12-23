import { Occasion } from '../components/tour-list/occasion';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http/';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OccasionService {

  private baseUrl = 'http://localhost:8080/api/cutprice';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      console.error(error);       
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message)
    
  }
  getOccasions(): Observable<Occasion[]> {
    return this.http.get<Occasion[]>(this.baseUrl)
      .pipe(
        tap(_ => this.log('fetched occasions')),
        catchError(this.handleError<Occasion[]>('getOccasion', []))
      );
  }
  getOccasion(id: number): Observable<Occasion> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Occasion>(url).pipe(
      tap(_ => this.log(`fetched Occasion id=${id}`)),
      catchError(this.handleError<Occasion>(`getOccasion id=${id}`))
    );
  }
  addOccasion(occasion: Occasion): Observable<Occasion> {
    return this.http.post<Occasion>(this.baseUrl, occasion, this.httpOptions).pipe(
      tap((newOccasion: Occasion) => this.log(`added occasion w/ id=${newOccasion._id}`)),
      catchError(this.handleError<Occasion>('addOcassion'))
    );
  }
  deleteTour(occasion: Occasion): Observable<Occasion> {
    const id = occasion._id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Occasion>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Occasion id=${id}`)),
      catchError(this.handleError<Occasion>('deleteOccasion'))
    );
  }
  searchOccasions(term: string): Observable<Occasion[]> {
    if (!term.trim()) {      
      return of([]);
    }
    return this.http.get<Occasion[]>(`${this.baseUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found Occasions matching "${term}"`) :
        this.log(`no Occasions matching "${term}"`)),
      catchError(this.handleError<Occasion[]>('searchOccasions', []))
    );
  }
  addComment(occasionId, data): Observable<any> {
    return this.http.post(`${this.baseUrl}/${occasionId}/addcomment`, data, this.httpOptions)
  }
  getComments(occasionId): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/?tourId=${occasionId}`);
  }
}
