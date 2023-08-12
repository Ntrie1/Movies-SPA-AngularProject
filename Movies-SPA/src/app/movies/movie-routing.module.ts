import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { CurrentMovieComponent } from './current-movie/current-movie.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { RecentMoviesComponent } from './recent-movies/recent-movies.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';



const routes: Routes = [
  {
    path: 'catalogMovies',
    component: AllMoviesComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'createMovie',
    component: NewMovieComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'movies/:movieId',
    component: CurrentMovieComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'recent',
    component: RecentMoviesComponent,

  },
  {
    path: 'movies/:movieId/edit',
    component: EditMovieComponent,
    canActivate: [AuthActivate]
  }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }