import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { ConfigurationService } from '../configuration.service';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private configurationService: ConfigurationService) { }

  getAll() {
    return this.http.get<User[]>(`${this.configurationService.getValue('apiUrl')}/users`);
  }
}
