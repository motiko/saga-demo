import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {delay} from 'redux-saga'
import {put, takeEvery, all, call} from 'redux-saga/effects'

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* rootSaga() {
  yield all([watchIncrementAsync()])
}

const sagaMiddleware = createSagaMiddleware()

const loggerMiddleware = store => next => action => {
  let result = next(action)
  console.log('Action', action)
  console.log('State', store.getState())
  return result
}

const store = createStore(
  reducer,
  applyMiddleware( sagaMiddleware, loggerMiddleware),
)

sagaMiddleware.run(rootSaga)

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

store.subscribe(() => {})

action('INCREMENT')
action('INCREMENT')
action('DECREMENT')
action('DECREMENT')
action('BOOM')
action('INCREMENT_ASYNC')
action('INCREMENT_ASYNC')
action('BOOM')
action('BOOM')

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker()
