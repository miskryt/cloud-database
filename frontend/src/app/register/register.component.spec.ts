import { RegisterComponent } from './register.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { AuthService } from '../_services/auth.service';

let fixture: ComponentFixture<RegisterComponent>;
let component: RegisterComponent ;
let authService: AuthService;

describe('RegisterFormComponent', () => {
  beforeEach(( async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [
        RegisterComponent
      ],
      providers:[FormBuilder, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('Empty email field has required error', () => {
    let errors = {};
    let email = component.registerForm.controls['email'];
    errors = email.errors || {};

    expect(errors.hasOwnProperty('required')).toBeTruthy();
  });

  it('Filled email field has no required error', () => {
    let errors = {};
    let email = component.registerForm.controls['email'];

    email.setValue(<any>'sad@gmail.com')
    fixture.detectChanges();

    errors = email.errors || {};
    expect(errors.hasOwnProperty('required')).toBeFalsy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not show error message', () =>{
    expect(component.errorMessage).toBe('')
  });

  it('should show "Email" input', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const email = htmlElement.querySelector('input[type="email"]')?.getAttribute('placeholder');
    expect(email).toEqual('Email');
  })

  it('should show "Password" input', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const email = htmlElement.querySelector('input[type="password"]')?.getAttribute('placeholder');
    expect(email).toEqual('Password');
  })

  it('should show "Register" button', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const button = htmlElement.querySelector('button')!;
    expect(button.textContent).toEqual('Register')
  })
});


