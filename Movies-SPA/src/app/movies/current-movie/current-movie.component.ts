import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-current-movie',
  templateUrl: './current-movie.component.html',
  styleUrls: ['./current-movie.component.css']
})
export class CurrentMovieComponent implements OnInit {

  isBookmarked: boolean = false;
  isLoading: boolean = true;
  movie: Movie | undefined;
  errorMessage: string = '';

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId']

    this.movieService.getMovieById(movieId).subscribe((movieData) =>
      this.movie = movieData
    )

  }


  upvote(): void {

  }

  downvote(): void {

  }

  bookmark(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId']
    this.movieService.bookmarkMovie(movieId).subscribe(
      () => {
        this.router.navigate(['/profile'])
        this.isBookmarked = true

        this.snackBar.open('Movie bookmarked successfully', 'Close', {
          duration: 3000, 
        }) 
        
      },
      (error) => {
        this.errorMessage =  error.error.error
        // this.snackBar.open(error.error.error, 'Close', {
        //   duration: 5000, 
        //   verticalPosition: 'top',
        // });
      }
    )
  }


}
