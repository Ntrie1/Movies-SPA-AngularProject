import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PasswordsDirective } from './validators/passwords.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    PasswordsDirective,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    
  ]
})
export class SharedModule { }
