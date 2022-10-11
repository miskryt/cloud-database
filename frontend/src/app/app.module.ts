import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCard, MatCardModule } from '@angular/material/card';
import { LoginFormComponent } from './login/login-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { ConfigurationService } from './configuration.service';
import { PageNotfoundComponent } from './pagenotfound/page-notfound.component';
import { HomeComponent } from './home/home.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './auth/guards/auth-guard-service';
import { BearerInterceptor } from './auth/interceptors/bearer-interceptor';
import { RegisterComponent } from './register/register.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { BackendService } from './_services/backend.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PostDialogComponent } from './post-dialog/post-dialog.component';

export function initApp(configurationService: ConfigurationService) {
  return () => configurationService.load();
}

@NgModule({
  entryComponents: [
    PostDialogComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginFormComponent,
    PageNotfoundComponent,
    HomeComponent,
    RegisterComponent,
    PostDialogComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatTableModule,
    DashboardModule,
    MatSidenavModule,
  ],
  providers: [
    AuthService,
    BackendService,
    AuthGuardService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationService]
    },
    {
      provide: 'LoginActivate',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    },
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
