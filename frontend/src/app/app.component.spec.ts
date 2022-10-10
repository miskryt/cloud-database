import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BackendService } from './_services/backend.service';

describe('AppComponent', () => { // 2
  beforeEach((() => { // 3
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[BackendService, HttpClient, HttpHandler]
    }).compileComponents();
  }));

  it('should create the app', () => { // 4
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
