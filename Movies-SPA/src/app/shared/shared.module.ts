import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SlicePipe } from './pipes/slice.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    SlicePipe,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    
  ]
})
export class SharedModule { }
