import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { NewMovieComponent } from './new-movie/new-movie.component';



const routes: Routes = [
  {
    path: 'catalogMovies',
    component: AllMoviesComponent
  },
  {
    path: 'createMovie',
    component: NewMovieComponent
  }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }