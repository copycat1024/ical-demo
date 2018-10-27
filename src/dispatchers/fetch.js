// @flow

import fetch from 'cross-fetch'

import {
  FETCH_START,
  FETCH_END
} from '../actions/fetch'

import type { Dispatch } from 'redux'
import type { FetchStartType, FetchEndType, FetchResponseType } from '../actions/fetch'

function fetchStart (url): FetchStartType {
  return {
    type: FETCH_START,
    request: {
      url: url
    }
  }
}

function fetchEnd (url: string, data: any, type: FetchResponseType): FetchEndType {
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

export function fetchUrl (url: string, type: FetchResponseType, attr: any) {
  let options = {
    method: attr.method === null ? 'GET' : attr.method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(attr.data === null ? {} : attr.data)
  }

  return (dispatch: Dispatch) => {
    dispatch(fetchStart(url))
    let res = fetch(url, options)
      .then(response => response.json(), err => {
        console.log(err)
      })
      .then((json: any) => {
        dispatch(fetchEnd(url, json, type))
      })
    return res
  }
}
