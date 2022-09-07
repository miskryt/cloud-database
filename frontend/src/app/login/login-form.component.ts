import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  errorMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit() {
    const val = this.loginForm.value;

    if( this.loginForm.invalid)
      return;

    if (val.email && val.password)
    {
       this.authService.login(val.email, val.password)
        .subscribe(
          {
            next: (data) => {
              this.router.navigateByUrl('/dashboard');
            },
            error: (error) => {
              console.log(error)
              this.errorMessage = error.error.message;
            }
          }
        );

    }
  }
}
