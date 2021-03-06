import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import * as reducers from "../src/views/actions/reducers";

const reducer = combineReducers(reducers);

export function initStore(initialState) {
  return applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState)
}
