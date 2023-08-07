import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bookmarkedMovies: Movie[] = [];

  constructor( private authService: AuthService) { }




  ngOnInit(): void {
    this.authService.getUserBookmarks().subscribe((moviesData) =>{
      console.log(moviesData)
    })
    
  }
}
