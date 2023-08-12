import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieRoutingModule } from './movie-routing.module';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { FormsModule } from '@angular/forms';
import { CurrentMovieComponent } from './current-movie/current-movie.component';
import { SharedModule } from "../shared/shared.module";
import { RecentMoviesComponent } from './recent-movies/recent-movies.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';



@NgModule({
    declarations: [
        AllMoviesComponent,
        NewMovieComponent,
        CurrentMovieComponent,
        RecentMoviesComponent,
        EditMovieComponent
    ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        FormsModule,
        SharedModule,
    ]
})
export class MoviesModule { }
