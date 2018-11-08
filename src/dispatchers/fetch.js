// @flow

import fetch from 'cross-fetch'

import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR
} from '../actions/fetch'

import type { Dispatch } from 'redux'
import type {
  FetchStartType,
  FetchEndType,
  FetchType
} from '../actions/fetch'

function fetchStart (url: string): FetchStartType {
  return {
    type: FETCH_START,
    request: {
      url: url
    }
  }
}

function fetchEnd (url: string, type: FetchType, data: any): FetchEndType {
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

function processResponse (res) {
  const { status, statusText, headers } = res
  const contentType = headers.get('Content-Type').split(';')[0]
  let body

  if (contentType === 'application/json') {
    body = res.json()
  } else {
    body = res.text()
  }

  if (status !== 200) {
    body.then(data => console.log(data))
    throw new Error({
      status: status,
      statusText: statusText
    })
  }
  return body
}

export function fetchUrl (url: string, type: FetchType, attr: any) {
  let options = {
    method: attr.method === null ? 'GET' : attr.method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(attr.data === null ? {} : attr.data)
  }

  return (dispatch: Dispatch) => {
    dispatch(fetchStart(url))
    let res = fetch(url, options)
      .then(response => processResponse(response))
      .then(json => {
        dispatch(fetchEnd(url, type, json))
      }, err => {
        dispatch(fetchEnd(url, FETCH_ERROR, err))
      })
    return res
  }
}
