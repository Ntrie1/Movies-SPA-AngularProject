import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  errorMessage: string | undefined;


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(
      (moviesData) => {
        this.movies = moviesData;
        this.isLoading = false;

        if (this.movies.length === 0) {
          this.errorMessage = 'There are not movies yet!';
        }

      },
      (error) =>{
        this.errorMessage = error;
      }

    )

  }


}
