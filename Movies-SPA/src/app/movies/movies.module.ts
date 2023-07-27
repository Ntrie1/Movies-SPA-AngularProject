import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieRoutingModule } from './movie-routing.module';



@NgModule({
  declarations: [
    AllMoviesComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MoviesModule { }
