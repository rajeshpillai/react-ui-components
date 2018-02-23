import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import {createStore, combineReducers} from './myredux';

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}
var store = createStore(counter);

console.log("store: ", store);

function render() {
    ReactDOM.render(<App store = {store} />, document.getElementById('root'));
}

render();

store.subscribe(() => {
    render();
})
registerServiceWorker();
