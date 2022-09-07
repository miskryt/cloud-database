import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { BackendService } from './_services/backend.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Cloud database';
  submitMessage = '';

  user: User | undefined;
  backendIsAlive: boolean = false;

  constructor(
    private router: Router,
    private backend: BackendService,
    private authenticationService: AuthService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }

   ngOnInit(): void
   {
      this.backend.isAlive().subscribe(
       {next:(data:any) => {
           //this.backendIsAlive = (data.body === HttpStatusCode.Ok.toString());
         }});
  }
}
