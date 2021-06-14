import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<any>((localStorage.getItem('token')) ? jwt_decode(localStorage.getItem('token')) : null);
    this.user = this.userSubject.asObservable();
   }
  public get userValue() {
    return this.userSubject.value;
  }
  login(data?) {
    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', {email:data.login, password:data.pass})
      .pipe(map(user => {
        localStorage.setItem('token', user.token);
        this.userSubject.next(localStorage.getItem('token'));
        return user;
      }));
  }
}
