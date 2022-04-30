import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent implements OnInit {

  private _jokeCount = 0;

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

  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    // // can set a different initial joke count in this onInit
    // this.jokeCount = 2;
  }

  addJoke(): void {
    this.jokeCount++;
  }

  removeAllJokes(): void {
    this.jokeCount = 0;
  }

  refreshCurrentJoke(): void {
    this.jokeService.refreshJoke();
  }

}
