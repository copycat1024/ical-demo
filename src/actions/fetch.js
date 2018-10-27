// @flow

import type { IcalInfo } from '../helper/IcalFilters'

export const FETCH_START = 'FETCH_START'
export const FETCH_END = 'FETCH_END'
export const FETCH_INFO_GROUP = 'FETCH_INFO_GROUP'
export const FETCH_INFO_COURSE = 'FETCH_INFO_COURSE'
export const FETCH_INFO_TEACHER = 'FETCH_INFO_TEACHER'
export const FETCH_INFO_ROOM = 'FETCH_INFO_ROOM'

type InfoFetchRequestType = {
  url: string
}

type FetchInfoResponseType = 'FETCH_INFO_GROUP' | 'FETCH_INFO_COURSE' | 'FETCH_INFO_TEACHER' | 'FETCH_INFO_ROOM'

type InfoFetchResponseType = {
  type: FetchInfoResponseType,
  data: IcalInfo
}

export type FetchStartType = {
  type: 'FETCH_START' | '',
  request: InfoFetchRequestType
}

export type FetchEndType = {
  type: 'FETCH_END' | '',
  request: InfoFetchRequestType,
  response: InfoFetchResponseType
}

export type FetchActionType = FetchStartType | FetchEndType
export type FetchResponseType = FetchInfoResponseType
