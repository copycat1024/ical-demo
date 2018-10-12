// @flow

import fetch from 'cross-fetch'

import {
  FETCH_START,
  FETCH_END,
  FETCH_INFO
} from '../actions/fetch'

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
      type: FETCH_INFO,
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
