import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';
import { BehaviorSubject, Subscription, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  createMovie(title: string, description: string, image: string, genre: string, date:string){
    return this.http.post<Movie>('/api/movies/create', { title, description, image, genre, date})
  }

  getAllMovies(){ 
    return this.http.get<Movie[]>('/api/movies');
  }

  getMovieById(movieId: string){
    return this.http.get<Movie>(`/api/movies/${movieId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403){
          const errorMessage = 'You are not authorized to delete this movie!'
          return throwError(errorMessage);
        }
        return throwError(error);
         // Rethrow the error to propagate to the component
      })
    )
      
  }

  bookmarkMovie(movieId: string){
    return this.http.put(`/api/movies/${movieId}/bookmark`, {})
  }

  removeBookmark(movieId: string){
    return this.http.put('/api/movies/removeBookmark', {movieId})
  }

  deleteMovie(movieId: string){
    return this.http.delete(`/api/movies/${movieId}`)
  }

}
