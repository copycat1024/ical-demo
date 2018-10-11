// @flow

import fetch from 'cross-fetch'
import type { Dispatch } from 'redux'
import { FetchStartType, FetchEndType } from '../actions/fetch'

function fetchInfo

export function fetchUrl (url: string, data: any) {
  return (dispatch: Dispatch) => {
    dispatch(requestBucket(bucket))
    let url = bucketConfig[bucket].url
    return fetch(url)
      .then(response => response.json())
      .then((json: dataItem) => {
        dispatch(receiveBucket(bucket, json))
      }, err => {
        console.log(err)
      })
  }
}
