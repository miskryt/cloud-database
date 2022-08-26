import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PageNotfoundComponent } from './pagenotfound/page-notfound.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/guards/auth-guard-service';
import { LoginFormComponent } from './login/login-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'users/me',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
