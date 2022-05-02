import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addJoke, refreshJoke, setJokeCount } from '../actions/joke.actions';
import { JokeService } from '../joke.service';
import { jokeState } from '../reducers/joke.reducer';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent implements OnInit, OnDestroy {

  private _jokeCount = 0;
  private countSubscription: Subscription;
  count$: Observable<number>;

  // private getter / setter lets us hijack a change to calculate a new change
  get jokeCount () { return this._jokeCount; }
  set jokeCount (count) { 
    this._jokeCount = count; 
    let jokes = [];
    for (let i=0; i<count; i++){
      jokes.push(i+1);
    }
    // we only assign the result of the new array once, preventing 
    // Angular's change detection from executing unnecessarily
    this.jokes = jokes; 
  }

  // We need an array of a size that matches the joke count to build copies of.
  // These could be full-fledged javascript objects but we're demonstrating the
  // components ability to coordinate with themselves
  jokes: number[] = [];

  constructor(private store: Store<{joke: jokeState}>) { 
    this.count$ = store.select(s => s.joke.jokeCount);

    // need to subscribe to updates from the store
    this.countSubscription = this.count$.subscribe(next => {this.jokeCount = next});
  }

  ngOnInit(): void {
    // need to trigger our joke refresh so that a network call gets made since the components can't do that on their own
    this.refreshCurrentJoke();
  }

  addJoke(): void {
    this.store.dispatch(addJoke());
  }

  setJokesNumber(count: number): void {
    this.store.dispatch(setJokeCount({count}))
  }

  removeAllJokes(): void {
    this.setJokesNumber(0);
  }

  refreshCurrentJoke(): void {
    this.store.dispatch(refreshJoke());
  }

  ngOnDestroy(): void {
    this.countSubscription.unsubscribe();
  }

}
