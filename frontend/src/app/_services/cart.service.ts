import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/tours';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class CartService {

  constructor(private http: HttpClient) { }
  
  create(data): Observable<any> {
    console.log("create")
    console.log(`${baseUrl}/user/cart`)
    console.log(data)
    return this.http.post(`${baseUrl}/user/cart`, data, httpOptions);
  }
  delete(id): Observable<any> {

    return this.http.delete(`${baseUrl}/user/cart/?id=${id}`);
  }

  get(userId): Observable<any> {
    console.log("get")
    console.log(`${baseUrl}/user/cart/?userId=${userId}`)
    return this.http.get(`${baseUrl}/user/cart/?userId=${userId}`);
  }


}
