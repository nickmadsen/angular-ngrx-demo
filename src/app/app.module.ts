import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import { JokeComponent } from './joke/joke.component';
import { JokeService } from './joke.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    JokesListComponent,
    JokeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
