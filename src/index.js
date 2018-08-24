import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

function* helloSaga() {
  console.log('Hello Sagas!')
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(helloSaga)

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}


const action = type => store.dispatch({type})

store.subscribe(() => {
  console.log('store updated')
  console.log(store.getState())
})

action('INCREMENT')
action('INCREMENT')
action('DECREMENT')
action('DECREMENT')
action('BOOM')


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
