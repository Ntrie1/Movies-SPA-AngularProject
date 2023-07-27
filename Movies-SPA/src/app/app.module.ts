import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './mainComponents/home/home.component';
import { NotFoundComponent } from './mainComponents/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UserRoutingModule } from './user/user-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { UserModule } from './user/user.module';
import { appInterceptorProvider } from './shared/app.interceptor';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
    MoviesModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    HttpClientModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
