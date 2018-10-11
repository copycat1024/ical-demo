// @flow

import fetch from 'cross-fetch'
import type { FETCH_START, FETCH_END } from '../actions/fetch'
import type { Dispatch } from 'redux'

function fetchStart (url) {
  return {
    type: FETCH_START,
    request: {
      url: url
    }
  }
}

function fetchEnd (url, data) {
  return {
    type: FETCH_END,
    request: {
      url: url
    },
    response: {
      data: data
    }
  }
}

export function fetchUrl (url: string) {
  return (dispatch: Dispatch) => {
    dispatch(fetchStart(url))
    return fetch(url)
      .then(response => response.json())
      .then((json: any) => {
        dispatch(fetchEnd(url, json))
      }, err => {
        console.log(err)
      })
  }
}
