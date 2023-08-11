import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string | null =  null;
  passwordsMatch: boolean = true;

  

  constructor( private auth: AuthService, private router: Router ) { }

  


  register(form: NgForm): void{
    if(form.invalid) return;

    const { username, email, password, rePassword } = form.value;
    
    if (password !== rePassword) {
      this.errorMessage = 'Passwords do not match';
      this.passwordsMatch = false;
      return;
    }

    
    this.auth.register(username, email, password, rePassword).subscribe(
      ()=>{
      this.router.navigate(['/home']);
    },
    (error) => {
      // Handle the error here
      // You can show the error message to the user
      this.errorMessage =  error;
      console.error(error); // Log the error for debugging
      // Show the error message to the user using a snackbar or alert
      // For example, if you have a snackbar service:
    
    }

    )
  }

}
