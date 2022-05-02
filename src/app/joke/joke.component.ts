import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { JokeService } from '../joke.service';
import { JokeDisplay } from '../models/joke-display.model';
import { Joke } from '../models/joke.model';
import { jokeState } from '../reducers/joke.reducer';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  @Input()
  jokeNumber: number = -1;
  
  joke$: Observable<JokeDisplay | undefined>;

  constructor(private store: Store<{joke: jokeState}>) { 
    this.joke$ = store.select(s => s.joke.currentJoke);
  }

  ngOnInit(): void {
    // this becomes pretty difficult to have each joke become responsible for getting its own joke
  }

}
