import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, catchError, tap, throwError } from 'rxjs';
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
    }),
    catchError((error) => {
      if (error.status === 409) {
       
        const errorMessage = error.error?.message || 'User already exists!';
        return throwError(errorMessage);
      } else {

        return throwError(error);
      }
    })
    );
  }

  login(email: string, password: string){
    return this.http
    .post<User>('/api/login', {email, password})
    .pipe(tap((user)=> {
      this.user$$.next(user)
      localStorage.setItem('user', JSON.stringify(user));
    }),
    catchError((error) => {
      if (error.status === 401) {
       
        const errorMessage = error.error?.message || 'Unauthorized';
        return throwError(errorMessage);
      } else {

        return throwError(error);
      }
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
    return this.http.get<Movie[]>('/api/users/profile/bookmarks')
           .pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage = 'An error occurred while fetching bookmarked movies. Please try again later.';

              if(error.status === 404){
                errorMessage = 'User not found!'
              } 
              else if(error.status === 400){
                errorMessage = 'No movies have been bookmarked yet!'
              } 

              return throwError(errorMessage);

            } )
           )


   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  



}
 