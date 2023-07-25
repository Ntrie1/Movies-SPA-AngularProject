import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';


const enterTransition = transition(':enter',  [
  style({
    opacity: 0
  }),
  animate(('1s ease-in'), style({ opacity: 1 }))
]);

const exitTransition = transition(':leave', [
  style({
    opacity: 1
  }),
  animate(('0.5s ease-out'), style({opacity: 0}))
])

const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn, fadeOut]
})
export class HomeComponent {

  isShown: boolean = false;

  fadeInFunc():void{
    this.isShown = !this.isShown;
  }


}
