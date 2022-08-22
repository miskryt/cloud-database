import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Cloud database';
  submitMessage = '';

  public formVisible: boolean = false;

  showLoginForm(){
    this.formVisible = true;
  }
}
