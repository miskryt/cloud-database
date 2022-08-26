import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Cloud database';
  constructor(private router: Router) { }

  public formVisible: boolean = false;

  showLoginForm(){
    this.router.navigate(['login']);
    //this.formVisible = true;
  }

  ngOnInit(): void {
  }

}
