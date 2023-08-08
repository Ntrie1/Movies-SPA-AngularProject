import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';

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
  isOwner: boolean = true;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }



  ngOnInit(): void {
    this.fetchMovieData()

  }

  fetchMovieData(){
    const movieId = this.activatedRoute.snapshot.params['movieId'];

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


  deleteMovie(): void {
      const movieId = this.activatedRoute.snapshot.params['movieId'];
     
      this.movieService.deleteMovie(movieId).subscribe(
        () => {
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.log(error)
          if (error.status === 403) {
           this.isOwner =  false;
           console.log('error occured!')
          
          } else {
            this.errorMessage = error.error.error;
          }
        }
      );
    

    }


}
