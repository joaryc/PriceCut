import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/cutprice';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class FavouriteService {

  constructor(private http: HttpClient) { }
  
  create(data, userId): Observable<any> {
    return this.http.post(`${baseUrl}/user/${userId}/favourite`, data, httpOptions);
  }
  delete(favouriteId,userId): Observable<any> {

    return this.http.delete(`${baseUrl}/user/${userId}/favourite`,favouriteId);
  }

  get(userId): Observable<any> {
    return this.http.get(`${baseUrl}/user/${userId}/favourite`);
  }


}
