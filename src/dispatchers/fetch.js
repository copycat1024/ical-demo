// @flow

import fetch from 'cross-fetch'

import {
  FETCH_START,
  FETCH_END
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

function fetchEnd (url, data, type) {
  return {
    type: FETCH_END,
    request: {
      url: url
    },
    response: {
      type: type,
      data: data
    }
  }
}

export function fetchUrl (url: string, attr) {
  return (dispatch: Dispatch) => {
    dispatch(fetchStart(url))
    let res = fetch(url)
      .then(response => response.json(), err => {
        console.log(err)
      })
      .then((json: any) => {
        console.log(json)
        dispatch(fetchEnd(url, json, attr.type))
      })
    return res
  }
}
