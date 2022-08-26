import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    confirm_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['/users/me']);
    }
  }

  onPasswordChange() {

    if (this.registerForm.value.confirm_password == this.registerForm.value.password) {
      this.registerForm.controls['confirm_password'].setErrors(null);
    } else {
      this.registerForm.controls['confirm_password'].setErrors({ mismatch: true });
    }
  }

  async onSubmit() {
    const val = this.registerForm.value;

    if( this.registerForm.invalid)
      return;

    if (val.email && val.password)
    {
      this.authService.register(val.email, val.password, val.confirm_password)
        .subscribe(
          {
            next: (data) => {
              this.router.navigateByUrl('users/me');
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
