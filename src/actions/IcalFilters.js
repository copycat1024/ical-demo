// @flow

import type { IcalItem, IcalFilter } from '../helper/IcalFilters'

export const ADD_CALENDAR = 'ADD_CALENDAR'
export const EDIT_CALENDAR = 'EDIT_CALENDAR'
export const DELETE_CALENDAR = 'DELETE_CALENDAR'

export type CalendarAction = {
  type: 'ADD_CALENDAR' | 'EDIT_CALENDAR' | 'DELETE_CALENDAR',
  key: number,
  item: IcalItem
}

export const ADD_FILTER = 'ADD_FILTER'
export const EDIT_FILTER = 'EDIT_FILTER'
export const DELETE_FILTER = 'DELETE_FILTER'

export type FilterAction = {
  type: 'ADD_FILTER' | 'EDIT_FILTER' | 'DELETE_FILTER',
  calendarKey: number,
  key: number,
  filter: IcalFilter
}

export type FiltersActionType = CalendarAction | FilterAction
