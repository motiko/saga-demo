import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {put, call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {incrementAsync} from './index'

it('generates delay effect', () => {
  const gen = incrementAsync()
  expect(gen.next().value).toEqual(call(delay, 1000))
})
