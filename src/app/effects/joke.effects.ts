import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { jokeApiRefreshComplete, refreshJoke } from "../actions/joke.actions";
import { JokeService } from "../joke.service";


@Injectable()
export class JokeEffects {

    // Effects subscribe to all "actions" that get dispatched through the store
    // and ...
    loadJoke$ = createEffect(() => this.actions$.pipe(

      // filter out only those that they want to listen to
      ofType(refreshJoke), 
      
      // and then do other async work
      mergeMap(() => this.jokeService.getSingleFreshJoke().pipe( 

        // before returning a new "action" which has its own reducer to deal with the result
        map(joke => jokeApiRefreshComplete({joke}))

      ))

    ));



    constructor(
        private actions$: Actions,
        private jokeService: JokeService
        ) {  }


}