import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BackendService } from './_services/backend.service';
import { RegisterComponent } from './register/register.component';

let fixture: ComponentFixture<AppComponent>;
let component: RegisterComponent ;

describe('AppComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[BackendService, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
