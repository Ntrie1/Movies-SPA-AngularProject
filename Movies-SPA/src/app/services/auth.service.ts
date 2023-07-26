import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }





  register(username: string, email: string, password: string, rePassword: string){
    return this.http.post<User>('http://localhost:3000/api/register', {username, email, password, rePassword});
  }

  login(email: string, password: string){
    return this.http.post('http://localhost:3000/api/login', {email, password})
  }
  



}
 