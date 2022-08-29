import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';

export interface Response{
  error: boolean,
  response: object
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  isUserLoggedIn: boolean = false;
  httpResult: HttpResponse<Response> | undefined;

  apiUrl: string = environment.apiUrl;
  loginUrl: string = environment.loginUrl;
  signUpUrl: string = environment.signUpUrl;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return <User>this.userSubject.value;
  }

  login(email: string, password: string) {
    const url = this.apiUrl + this.loginUrl;

    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<User>(url, body, {headers: { 'content-type': 'application/x-www-form-urlencoded' },
      responseType: 'json',})
      .pipe(map(user => {
        user.auth_data = window.btoa(email + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(email: string, password: string) {
    const url = this.apiUrl + this.signUpUrl;

    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<User>(url, body, {headers: { 'content-type': 'application/x-www-form-urlencoded' },
      responseType: 'json',})
      .pipe(map(user => {
        user.auth_data = window.btoa(email + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
  }

  get token()
  {
    return <User><unknown>this.userSubject.value.access_token;
  }

  isLoggedIn():boolean
  {
    return !!(this.userValue && this.userValue.access_token);
  }
}
