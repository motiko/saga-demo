import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { delay } from "redux-saga";
import { put, takeEvery, all, call } from "redux-saga/effects";

function jsonFetch(url) {
  return fetch(url).then(r => r.json());
}

function* fetchQuestions() {
  const response = yield call(
    jsonFetch,
    "https://opentdb.com/api.php?amount=10"
  );
  console.log("response", response);
  yield put({ type: "QUESTIONS_RECIEVED", questions: response.results });
}

function* watchRequestQuestions() {
  yield takeEvery("REQUEST_QUESTIONS", fetchQuestions);
}

function* rootSaga() {
  yield all([watchRequestQuestions()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

function reducer(state = { questions: [] }, action) {
  switch (action.type) {
    case "QUESTIONS_RECIEVED":
      return { questions: action.questions };
    default:
      return state;
  }
}

const action = type => store.dispatch({ type });

store.subscribe(() => {
  const state = store.getState();
  console.log("Questions", state.questions);
});

action("REQUEST_QUESTIONS");

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
