// @flow

import fetch from 'cross-fetch'

import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_SETTING,
  FETCH_EVENTS
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
  const { status, statusText, headers, url } = res
  const contentType = headers.get('Content-Type').split(';')[0]
  let body

  if (contentType === 'application/json') {
    body = res.json()
  } else {
    body = res.text()
  }

  if (status !== 200) {
    return body.then(data => {
      throw new Error(JSON.stringify({
        status: status,
        statusText: statusText,
        data: data,
        url: url
      }))
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
      // 'Content-Type': 'application/json; charset=utf-8',
      // 'X-CSRFToken': readCookie('csrftoken'),
      // 'Accept': 'application/json'
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
        if (type === FETCH_SETTING) {
          dispatch(fetchUrl('mock/all_event.json', FETCH_EVENTS, {}))
        }
      }, err => {
        dispatch(fetchEnd(url, FETCH_ERROR, err))
      })
    return res
  }
}

// function readCookie (name) {
//   var nameEQ = encodeURIComponent(name) + '='
//   var ca = document.cookie.split(';')
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i]
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length)
//     if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
//   }
//   return null
// }
