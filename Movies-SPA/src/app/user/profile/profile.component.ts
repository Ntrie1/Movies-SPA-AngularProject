import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';
import { Profile } from 'src/app/types/userProfile';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  
  profileDetails: Profile  = {
    username: '',
    email: '',
  };
 

  bookmarkedMovies: Movie[] = [];
  errorMessage: string | null = null; 

  constructor( 
    private authService: AuthService, 
    private movieService: MovieService,
    private router: Router ) { }


  
  
  ngOnInit(): void {
   this.fetchBookmarkedMovies();
   const { username, email } = this.authService.user!;
   this.profileDetails  = {username, email};
  }

  fetchBookmarkedMovies(): void {
    this.authService.getUserBookmarks().subscribe(
      (moviesData) => {
        this.bookmarkedMovies = moviesData;
        this.errorMessage = null;

        if (this.bookmarkedMovies.length === 0) {
          this.errorMessage = 'No movies have been bookmarked yet!';
        }
      },
      (error) => {
        this.errorMessage = error;
        this.bookmarkedMovies = [];
        console.log('Error occurred:', this.errorMessage);
      }
    );
  }


  unfave(movieId: string):void{
    this.movieService.removeBookmark(movieId).subscribe(() =>{
     this.fetchBookmarkedMovies(); 
      this.router.navigate(['/profile'])
    }
    )

    
  }


}
