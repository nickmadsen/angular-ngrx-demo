import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import { JokeComponent } from './joke/joke.component';
import { JokeService } from './joke.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { JokeEffects } from './effects/joke.effects';


@NgModule({
  declarations: [
    AppComponent,
    JokesListComponent,
    JokeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([JokeEffects])
  ],
  providers: [JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
