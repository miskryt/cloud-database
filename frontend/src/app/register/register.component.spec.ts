import { RegisterComponent } from './register.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { expect } from '@angular/flex-layout/_private-utils/testing';

let fixture: ComponentFixture<RegisterComponent>;
let component: RegisterComponent ;

describe('RegisterFormComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      providers:[FormBuilder, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => { // 4
    expect(component).toBeTruthy();
  });

  it('should not show error message', () =>{
    expect(component.errorMessage).toBe('')
  });

  it('should show "Email" input', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const email = htmlElement.querySelector('input[type="email"]')!.getAttribute('placeholder');
    expect(email).toEqual('Email');
  })

  it('should show "Password" input', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const email = htmlElement.querySelector('input[type="password"]')!.getAttribute('placeholder');
    expect(email).toEqual('Password');
  })

  it('should show "Register" button', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const button = htmlElement.querySelector('button')!;
    expect(button.textContent).toEqual('Register')
  })
});


