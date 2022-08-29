import { Component } from '@angular/core';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Cloud database';
  submitMessage = '';

  user: User | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  logout() {
    console.log('asdadsdasadsdas');
    this.authenticationService.logout();
    window.location.reload();
  }
}
