import {Injectable} from '@angular/core';
import { Data, DataResponse } from '../_models/data';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendService {

  apiUrl: string = environment.apiUrl;
  addPostUrl: string = environment.addPostUrl;
  deletePostUrl: string = environment.deletePostUrl;
  aliveUrl: string = environment.aliveUrl;
  getDataUrl: string = environment.getDataUrl;

  ELEMENT_DATA: Data[] = [];

  constructor(private http: HttpClient) {
  }

  getData(pageSize: number, currentPage: number, search: string = ''): Observable<DataResponse> {
    const url = this.apiUrl + this.getDataUrl;
    return this.http.get<DataResponse>(url + '?page=' + currentPage + '&pageSize='+ pageSize + '&search='+search);
  }

  addPost(data: Data): Observable<Data> {
    const url = this.apiUrl + this.addPostUrl;

    const options = {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      responseType: 'json' as const
    };

    let body = new URLSearchParams();

    body.set('key', data.key ? data.key : '');
    body.set('value', data.value ? data.value : '');

    return this.http.put<Data>(url, body, options);
  }

   deletePost(id: number, index: number) {
    const url = `${this.apiUrl + this.deletePostUrl}/${id}`  ;
    const options = {
      responseType: 'text' as const,
      observe: 'response' as const
    };

    return this.http.delete(url, options);
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
