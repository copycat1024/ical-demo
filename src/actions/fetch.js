// @flow

export const FETCH_START = 'FETCH_START'
export const FETCH_END = 'FETCH_END'
export const FETCH_INFO_GROUP = 'FETCH_INFO_GROUP'
export const FETCH_INFO_COURSE = 'FETCH_INFO_COURSE'
export const FETCH_INFO_TEACHER = 'FETCH_INFO_TEACHER'
export const FETCH_INFO_ROOM = 'FETCH_INFO_ROOM'
export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_ERROR = 'FETCH_ERROR'

type InfoFetchType = 'FETCH_INFO_GROUP' | 'FETCH_INFO_COURSE' | 'FETCH_INFO_TEACHER' | 'FETCH_INFO_ROOM'
type EventFetchType = 'FETCH_EVENTS' | ''
export type FetchType = InfoFetchType | EventFetchType | 'FETCH_ERROR'

export type FetchRequestType = {
  url: string
}

export type FetchResponseType = {
  type: FetchType,
  data: any
}

export type FetchStartType = {
  type: 'FETCH_START' | '',
  request: FetchRequestType
}

export type FetchEndType = {
  type: 'FETCH_END' | '',
  request: FetchRequestType,
  response: FetchResponseType
}

export type FetchActionType = FetchStartType | FetchEndType
