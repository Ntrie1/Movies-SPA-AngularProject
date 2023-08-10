import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';
import { AuthService } from 'src/app/services/auth.service';

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
  isOwner: boolean = false;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    ) { }



  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId']
    const userId = this.authService.user?._id;
    // const user = this.authService.user;
    

    this.movieService.getMovieById(movieId).subscribe(
      (movieData) =>{
      this.movie = movieData

      if(userId && this.movie.userId.toString() === userId){
        this.isOwner = true;
      }



      this.authService.getUserBookmarks().subscribe(
        (userBookmarkedMovies) =>{

          
          console.log('Movie ID:', movieId);
          console.log('User Movies:', userBookmarkedMovies);

          const bookmarkedMovies = userBookmarkedMovies?.some((m) => m._id.toString() === movieId.toString());
          this.isBookmarked = bookmarkedMovies;
          
        }
        )

    

      //  const bookmarkedMovies = user?.movies.some((m) => m.toString() === movieId.toString());
    //  console.log(bookmarkedMovies);

    },
    (error) =>{
       this.errorMessage = error;
       console.log(error);
    }
    
    
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
    const shouldDelete = window.confirm('Are you sure you want to delete this movie?');

    if (shouldDelete) {
    
    const movieId = this.activatedRoute.snapshot.params['movieId'];

    this.movieService.deleteMovie(movieId).subscribe(
      () => {
        this.router.navigate(['/catalogMovies']);
      },
      (error) => {
        if (error.status === 403) {
        } else {
          this.errorMessage = error.error.error;
        }
      }
    );
  }

 }

}
