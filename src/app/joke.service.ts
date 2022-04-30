import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Joke } from './models/joke.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  readonly apiUrl = 'https://v2.jokeapi.dev/joke/Any?safe-mode';
  
  private currentJoke?: Joke;
  private activeRequest = false;
  private jokeSubject = new ReplaySubject<Joke>(1);
  
  joke$: Observable<Joke>;

  constructor(private http: HttpClient) { 
    this.joke$ = this.jokeSubject.asObservable();
  }

  getJoke(): Observable<Joke>{

    // if we haven't fetched our first joke, go ahead and fetch 
    // it as long as we're not already fetching one
    if(!this.currentJoke && !this.activeRequest) {
      this.refreshJoke();
    }
    
    return this.joke$;
  }

  getSingleFreshJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.apiUrl);
  }

  refreshJoke(): void {
    this.activeRequest = true;

    this.http.get<Joke>(this.apiUrl).subscribe({
      next: (joke: Joke) => {
        this.currentJoke = joke;
        this.jokeSubject.next(this.currentJoke); // updates any components subscribed to this
      },
      error: console.error,
      complete: () => {
        console.log('Joke network observable completed');
        this.activeRequest = false;
        // complete (this is the last time the observable will be done)
      }
    });
  }
}
