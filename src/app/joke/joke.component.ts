import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JokeService } from '../joke.service';
import { Joke } from '../models/joke.model';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit, OnDestroy {

  @Input()
  jokeNumber: number = -1;
  joke?: Joke;
  jokeSubscription?: Subscription;

  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    // this sets up a subscription to get any future updates - to dig into this go check out how the JokeService works
    this.jokeSubscription = this.jokeService.getJoke().subscribe((next) => {this.joke = next;});

    // if you use this single refresh call, the subscription immediately completes so no unsubscribing is necessary
    // this.jokeService.getSingleFreshJoke().subscribe((next) => {this.joke = next;});
  }

  ngOnDestroy(): void {
    // because we're keeping an active subscription we need to make sure we destroy that subscription along with the component
    this.jokeSubscription?.unsubscribe();
  }

}
