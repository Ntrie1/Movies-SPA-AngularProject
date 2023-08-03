import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotAuthActivate } from '../core/guards/notAuth.activate';


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
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }