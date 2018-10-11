// @flow

import type { IcalInfo } from '../helper/IcalFilters'

export const FETCH_START = 'FETCH_START'
export const FETCH_END = 'FETCH_END'
export const FETCH_INFO = 'FETCH_INFO'

type InfoFetchRequestType = {
  url: string
}

type InfoFetchResponseType = {
  type: 'FETCH_INFO',
  data: IcalInfo
}

export type FetchStartType = {
  type: 'FETCH_START' | '',
  request: InfoFetchRequestType
}

export type FetchEndType = {
  type: 'FETCH_START' | '',
  request: InfoFetchRequestType,
  response: InfoFetchResponseType
}

export type FetchActionType = FetchStartType | FetchEndType
