import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-recent-movies',
  templateUrl: './recent-movies.component.html',
  styleUrls: ['./recent-movies.component.css']
})
export class RecentMoviesComponent implements OnInit {
  movies: Movie[] = [];
  errorMessage: string | undefined;

  constructor(private movieService: MovieService, private authService: AuthService) { }


  get isLogged(): boolean {
    return this.authService.isLogged;
  }



  ngOnInit(): void {
    this.loadMovies();

  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (moviesData) => {
        this.movies = moviesData.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
          .slice(0, 10);

        if (this.movies.length === 0) {
          this.errorMessage = 'There are not movies yet!';
        }

      },
      (error) =>{
        this.errorMessage =  'An error occured fetching the movies!'
      }
    )

  }



}
