import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent {

  errorMessage: string | undefined;

  constructor(private apiService: MovieService, private router: Router) {}

  newMovieSubmitHandler(form: NgForm): void{
    if(form.invalid) return;
  
    const { title, description, image, genre, date } = (form.value);
   

    this.apiService.createMovie( title, description, image, genre, date)
    .subscribe(
      () =>{
      this.router.navigate(['/catalogMovies'])
    },
    (error) =>{
      this.errorMessage = 'An error occured trying to create a movie!'
    }
    )
    
  }
}
