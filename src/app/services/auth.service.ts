import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Base API URL
  ROOT_URL: string = 'http://localhost:8080/api/todo/';

  constructor(private http: HttpClient) { }

  //authenticates the user by email and password
  authenticateUser(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(this.ROOT_URL + "authenticate", { 'headers': headers });
  }

  //adds a new user
  addNewUser(user: User): Observable<User> {
    const headers = new HttpHeaders()
      .set('password', user.password);
    return this.http.post<User>(this.ROOT_URL + "authenticate/new", user, { 'headers': headers });
  }
}
