// @flow
/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import IcalApp from './components/IcalApp'
import IcalReducer from './reducers'
import './style/index.less'

function createRoot (): HTMLElement {
  let el = document.createElement('div')
  el.setAttribute('id', 'root')
  return el
}

function render () {
  const store = createStore(IcalReducer)

  let root: HTMLElement | null = document.getElementById('root')
  if (root === null) {
    root = createRoot()
  }

  ReactDOM.render(
    <Provider store={store}>
      <IcalApp />
    </Provider>,
    root
  )
}

render()
if (module.hot) {
  module.hot.accept('./components', render)
}
