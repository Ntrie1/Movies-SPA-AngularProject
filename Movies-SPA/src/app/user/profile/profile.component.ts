import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor( private authService: AuthService) { }


  
  
  ngOnInit(): void {
    this.authService.getUserBookmarks().subscribe(
      (moviesData) =>{
        this.bookmarkedMovies = moviesData;
        this.errorMessage = null;
        
        if (this.bookmarkedMovies.length === 0) {
          this.errorMessage = 'No movies have been bookmarked yet!';
        }
        const { username, email } = this.authService.user!;
        this.profileDetails =  { username, email };

      console.log('Error =>', this.errorMessage)
      console.log('Moives =>', this.bookmarkedMovies)
     
    },
    (error) => {
      this.errorMessage = error;
      this.bookmarkedMovies = [];
      console.log('Error occured:', this.errorMessage)

    }
    
    )
    
  }
}
