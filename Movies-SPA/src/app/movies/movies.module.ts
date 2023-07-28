import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieRoutingModule } from './movie-routing.module';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllMoviesComponent,
    NewMovieComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule
  ]
})
export class MoviesModule { }
