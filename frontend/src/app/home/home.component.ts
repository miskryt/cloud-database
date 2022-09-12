import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Cloud database';
  constructor(private router: Router, private authService: AuthService) { }

  public formVisible: boolean = false;

  showLoginForm(){
    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['dashboard']);
    }
    else
    {
      this.router.navigate(['login']);
    }
    //this.formVisible = true;
  }

  ngOnInit(): void {
  }

}
