import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {


  movie: Movie | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
  
      const movieId = this.route.snapshot.params['movieId']
      if (movieId) {
        this.movieService.getMovieById(movieId).subscribe(
          (movie) => {
            this.movie = movie;
            console.log(movie)
          },
          (error) => {
            this.errorMessage = 'Error loading movie data';
          }
        );
      }
   
  }

  saveChanges(): void {
    if (this.movie) {
      this.movieService.editMovie(this.movie).subscribe(
        (updatedMovie) => {
          this.router.navigate([`/movies/${this.movie?._id}`]);
        },
        (error) => {
          this.errorMessage = 'Error saving movie changes';
        }
      );
    }
  }


}
