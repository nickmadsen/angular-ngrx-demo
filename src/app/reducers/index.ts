import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { jokeReducer, jokeState } from './joke.reducer';

// This is supposed to be the thing governing all the relevant state of your application.
// Some things don't belong in state...a good way to think about it would be any data necessary
// to rebuild the app from a refresh back to whatever the user had saved
export interface State {
  joke: jokeState
}

// This lets you split up some of these functions into separate "chunks" of the application
export const reducers: ActionReducerMap<State> = {
  joke: jokeReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
