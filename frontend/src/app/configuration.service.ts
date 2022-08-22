import { catchError, filter, map, mapTo, Observable, of, ReplaySubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration = {};

  constructor(private httpClient: HttpClient) {
    this.load();
  }

  load(): Observable<void> {
    return this.httpClient.get('/assets/config.json')
      .pipe(
        tap((configuration: any) => this.configuration = configuration),
        map(() => undefined),
      );
  }

  getValue(key: string, defaultValue?: any): any {
    // @ts-ignore
    return this.configuration[key] || defaultValue;
  }
}
