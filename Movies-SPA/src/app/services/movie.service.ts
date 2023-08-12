import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';
import { catchError, throwError } from 'rxjs';

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
    return this.http.get<Movie>(`/api/movies/${movieId}`);
  }

  bookmarkMovie(movieId: string){
    return this.http.put(`/api/movies/${movieId}/bookmark`, {})
  }

  removeBookmark(movieId: string){
    return this.http.put('/api/movies/removeBookmark', {movieId})
  }

  deleteMovie(movieId: string){
    return this.http.delete(`/api/movies/${movieId}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while fetching bookmarked movies. Please try again later.';

        if(error.status === 404){
          errorMessage = 'Movie not found!'
        } 
        else if(error.status === 403){
          errorMessage = 'You are not authorized to delete this movie!'
        } 

        return throwError(errorMessage);

      } )
     )
  }

  editMovie(movie: Movie){
    return this.http.put<Movie>(`/api/movies/edit/${movie._id}`, movie).pipe(
      catchError((error) => {
        throw 'Error editing movie';
      })
    );
  }
  

}
