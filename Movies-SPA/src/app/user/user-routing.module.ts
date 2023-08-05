import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotAuthActivate } from '../core/guards/notAuth.activate';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthActivate]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthActivate]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }