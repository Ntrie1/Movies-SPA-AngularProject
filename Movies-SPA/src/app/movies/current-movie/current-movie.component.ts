import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-current-movie',
  templateUrl: './current-movie.component.html',
  styleUrls: ['./current-movie.component.css']
})
export class CurrentMovieComponent implements OnInit {

  isBookmarked: boolean = false;
  isLoading: boolean = true;
  movie: Movie | undefined;

  constructor(
    private movieService: MovieService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId']

    this.movieService.getMovieById(movieId).subscribe((movieData) =>
    this.movie = movieData
     )
  
  }


  upvote(): void{

  }

  downvote():void{

  }

  bookmark(): void{
    const movieId = this.activatedRoute.snapshot.params['movieId']
    this.movieService.bookmarkMovie(movieId).subscribe(()=>{
      this.router.navigate(['/home'])
      this.isBookmarked = true;
    })
  }


}
