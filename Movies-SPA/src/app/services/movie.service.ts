import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  createMovie(title: string, description: string, image: string, genre: string){
    return this.http.post('/api/movies/create', { title, description, image, genre})
  }
}
