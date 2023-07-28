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
  constructor(private apiService: MovieService, private router: Router) {}

  newThemeSubmitHandler(form: NgForm): void{
    if(form.invalid){
      return;
    }
    const { title, description, image, genre  } = (form.value);

    this.apiService.createMovie( title, description, image, genre)
    .subscribe(() =>{
      this.router.navigate(['/catalogMovies'])
    })
    
  }
}
