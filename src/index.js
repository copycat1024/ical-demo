// @flow
/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import IcalApp from './components/IcalApp'

function createRoot (): HTMLElement {
  let el = document.createElement('div')
  el.setAttribute('id', 'root')
  return el
}

function render () {
  let root: HTMLElement | null = document.getElementById('root')
  if (root === null) {
    root = createRoot()
  }
  ReactDOM.render(<IcalApp />, root)
}

render()
if (module.hot) {
  module.hot.accept('./components', render)
}
