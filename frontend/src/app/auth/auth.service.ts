import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';

export interface Response{
  error: boolean,
  response: object
}

@Injectable()
export class AuthService {

  isUserLoggedIn: boolean = false;
  httpResult: HttpResponse<Response> | undefined;

  apiUrl: string = this.configurationService.getValue('apiUrl');
  loginUrl: string = this.configurationService.getValue('loginUrl');

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {}

   login(email: string, password: string) {
    const url = this.apiUrl + this.loginUrl;

    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<Response>(url, body.toString(), {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //observe: 'response' as 'response',
      responseType: 'json',
    });
  }

  logout(): void {
  }
}
