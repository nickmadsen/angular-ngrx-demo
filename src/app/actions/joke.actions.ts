import { createAction, props } from "@ngrx/store";
import { Joke } from "../models/joke.model";

export const addJoke = createAction('[JokesList Component] Add');
export const removeAllJokes = createAction('[JokesList Component] Clear');
export const setJokeCount = createAction('[JokesList Component] Set Count', props<{count: number}>());
export const refreshJoke = createAction('[JokesList Component] Refresh');
export const jokeApiRefreshComplete = createAction('[Joke API] Joke Loaded Success', props<{joke: Joke}>());