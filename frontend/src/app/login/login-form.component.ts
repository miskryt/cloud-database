import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, Response } from '../auth/auth.service';
import { Router } from '@angular/router';

const myNameValidator = (maxLength: number) => (control: FormControl) => {
  const condition = !!control.value && control.value.length > maxLength;
  if (!condition) {
    return {myNameValidator: 'does not match the condition'}
  }
  return null;
}

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
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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
              localStorage.setItem('isUserLoggedIn', 'true');
              this.router.navigateByUrl('/users/me');
            },
            error: (error) => {
              console.log(error.error);
              this.errorMessage = error.error.message;
            }
          }
        );

    }
  }
}
