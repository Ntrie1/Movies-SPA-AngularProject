import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);

 public user$ = this.user$$.asObservable();

  user: User | undefined



  get isLogged(): boolean{
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) { 
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      this.user$$.next(user);
    }

  } 





  register(username: string, email: string, password: string, rePassword: string){
    return this.http
    .post<User>('/api/register', {username, email, password, rePassword})
    .pipe(tap((user)=> {
      this.user$$.next(user)
      localStorage.setItem('user', JSON.stringify(user));
    })
    );
  }

  login(email: string, password: string){
    return this.http
    .post<User>('/api/login', {email, password})
    .pipe(tap((user)=> {
      this.user$$.next(user)
      localStorage.setItem('user', JSON.stringify(user));
    })
      
      );
  }


  logout(){
    return this.http
    .post<User>('/api/logout', {})
    .pipe(tap(() => {
      this.user$$.next(undefined)
      localStorage.removeItem('user');
    })
    )

  }

  getProfile() {
    return this.http
        .get<User>('/api/users/profile', {})
        .pipe(tap((user) => this.user$$.next(user)));
}


   getUserBookmarks(){
    return this.http.get<Movie[]>('/api/users/profile/bookmarks');


   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  



}
 