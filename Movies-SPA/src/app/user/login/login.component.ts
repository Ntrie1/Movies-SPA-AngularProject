import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }

  login(form: NgForm){
    if(form.invalid) return;

    const { email, password } = form.value;
    console.log(email, password)

    this.auth.login(email, password).subscribe(()=>{

      this.router.navigate(['/home'])
    }
    )



  }

}
