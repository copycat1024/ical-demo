// @flow

import type { CalendarAction, FilterAction } from '../actions/IcalFilters'
import type { IcalItem, IcalFilter } from '../helper/IcalFilters'

import {
  ADD_CALENDAR,
  EDIT_CALENDAR,
  DELETE_CALENDAR,
  ADD_FILTER,
  EDIT_FILTER,
  DELETE_FILTER
} from '../actions/IcalFilters'

const defaultNewItem = {
  type: 'empty',
  key: -1
}

export function addCalendar (item: IcalItem = defaultNewItem): CalendarAction {
  return {
    type: ADD_CALENDAR,
    key: -1,
    item: item
  }
}

export function editCalendar (key:number, item: IcalItem): CalendarAction {
  return {
    type: EDIT_CALENDAR,
    key: key,
    item: item
  }
}

export function deleteCalendar (key: number): CalendarAction {
  return {
    type: DELETE_CALENDAR,
    key: key,
    item: defaultNewItem
  }
}

const defaultNewFilter = {
  type: 'empty',
  condition: 'none',
  key: -1,
  value: ''
}

export function addFilter (calendarKey: number, filter: IcalFilter = defaultNewFilter): FilterAction {
  return {
    type: ADD_FILTER,
    calendarKey: calendarKey,
    key: -1,
    filter: filter
  }
}

export function editFilter (calendarKey: number, key:number, filter: IcalFilter): FilterAction {
  return {
    type: EDIT_FILTER,
    calendarKey: calendarKey,
    key: key,
    filter: filter
  }
}

export function deleteFilter (calendarKey: number, key: number): FilterAction {
  return {
    type: DELETE_FILTER,
    calendarKey: calendarKey,
    key: key,
    filter: defaultNewFilter
  }
}
