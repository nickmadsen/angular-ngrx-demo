import { createReducer, on } from '@ngrx/store';
import { addJoke, removeAllJokes, refreshJoke, setJokeCount, jokeApiRefreshComplete } from '../actions/joke.actions';
import { JokeDisplay } from '../models/joke-display.model';

export interface jokeState {
    jokeCount: number;
    currentJoke?: JokeDisplay
}

export const jokeInitialState: jokeState = {
    jokeCount: 0
}

export const jokeReducer = createReducer(
    jokeInitialState,
    on( addJoke, (state: jokeState) => {return { ...state, jokeCount: state.jokeCount + 1}}),
    on( removeAllJokes, (state: jokeState) => {return { ...state, jokeCount: 0}}),
    on( setJokeCount, (state: jokeState, { count }) => {return { ...state, jokeCount: count }}),
    on( jokeApiRefreshComplete, (state: jokeState, { joke }) => {return { ...state, currentJoke: {joke: joke.joke, setup: joke.setup, delivery: joke.delivery} }})
)