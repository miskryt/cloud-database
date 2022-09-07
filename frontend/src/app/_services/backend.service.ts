import {Injectable} from '@angular/core';
import {Data} from '../_models/data';
import {Observable, of} from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {

  apiUrl: string = environment.apiUrl;
  loginUrl: string = environment.loginUrl;
  signUpUrl: string = environment.signUpUrl;
  aliveUrl: string = environment.aliveUrl;

  ELEMENT_DATA: Data[] = [
    { key: 'Post One', value: 'Web Development', date_posted: new Date() },
    { key: 'Post 2', value: 'Web Development 2', date_posted: new Date() },
    { key: 'Post 3', value: 'Web Development 3', date_posted: new Date() },
    { key: 'Post 4', value: 'Web Development 4', date_posted: new Date() },
    { key: 'Post 5', value: 'Web Development 5', date_posted: new Date() },
    { key: 'Post 6', value: 'Web Development 6', date_posted: new Date() },
    { key: 'Post 7', value: 'Web Development 7', date_posted: new Date() },
    { key: 'Post 8', value: 'Web Development 8', date_posted: new Date() },
  ];

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Data[]> {
    return of<Data[]>(this.ELEMENT_DATA);
  }

  addPost(data: Data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index: number) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }

  isAlive()
  {
    const url = this.apiUrl + this.aliveUrl;
    const options = {
      responseType: 'text' as const,
      observe: 'response' as const
    };

    return this.http.get(url, options);
  }
}
