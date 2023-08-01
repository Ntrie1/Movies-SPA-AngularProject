import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';

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
    return this.http.post(`/api/movies/${movieId}/bookmark`, {})
  }

}
