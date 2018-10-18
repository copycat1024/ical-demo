// @flow

import {
  ADD_CALENDAR,
  EDIT_CALENDAR,
  DELETE_CALENDAR,
  ADD_FILTER,
  EDIT_FILTER,
  DELETE_FILTER
} from '../actions/IcalFilters'

import {
  FETCH_END,
  FETCH_INFO_GROUP,
  FETCH_INFO_COURSE,
  FETCH_INFO_TEACHER,
  FETCH_INFO_ROOM
} from '../actions/fetch'

import type { IcalActionType } from './../actions'
import type { IcalCalendar, IcalInfo } from '../helper/IcalFilters'

export type IcalFilterState = {
  calendars: IcalCalendar[],
  info: IcalInfo
}

function IcalFilterDefault (): IcalFilterState {
  return {
    calendars: [],
    info: {
      group: {},
      course: {},
      teacher: {},
      room: {}
    }
  }
}

export default function (state: IcalFilterState = IcalFilterDefault(), action: IcalActionType) {
  switch (action.type) {
    case ADD_CALENDAR: {
      const { item } = action
      return {
        ...state,
        calendars: [
          ...state.calendars,
          {
            item: item,
            filters: []
          }
        ]
      }
    }
    case EDIT_CALENDAR: {
      const { item, key } = action
      return {
        ...state,
        calendars: [
          ...state.calendars.slice(0, key),
          {
            ...state.calendars[key],
            item: item
          },
          ...state.calendars.slice(key + 1)
        ]
      }
    }
    case DELETE_CALENDAR: {
      const { key } = action
      return {
        ...state,
        calendars: [
          ...state.calendars.slice(0, key),
          ...state.calendars.slice(key + 1)
        ]
      }
    }
    case ADD_FILTER: {
      const { calendarKey, filter } = action
      const oldFilters = state.calendars[calendarKey].filters
      const newFilter = [
        ...oldFilters,
        filter
      ]
      return {
        ...state,
        calendars: [
          ...state.calendars.slice(0, calendarKey),
          {
            ...state.calendars[calendarKey],
            filters: newFilter
          },
          ...state.calendars.slice(calendarKey + 1)
        ]
      }
    }
    case EDIT_FILTER: {
      const { calendarKey, key, filter } = action
      const oldFilters = state.calendars[calendarKey].filters
      const newFilter = [
        ...oldFilters.slice(0, key),
        filter,
        ...oldFilters.slice(key + 1)
      ]
      return {
        ...state,
        calendars: [
          ...state.calendars.slice(0, calendarKey),
          {
            ...state.calendars[calendarKey],
            filters: newFilter
          },
          ...state.calendars.slice(calendarKey + 1)
        ]
      }
    }
    case DELETE_FILTER: {
      const { calendarKey, key } = action
      const oldFilters = state.calendars[calendarKey].filters
      const newFilter = [
        ...oldFilters.slice(0, key),
        ...oldFilters.slice(key + 1)
      ]
      return {
        ...state,
        calendars: [
          ...state.calendars.slice(0, calendarKey),
          {
            ...state.calendars[calendarKey],
            filters: newFilter
          },
          ...state.calendars.slice(calendarKey + 1)
        ]
      }
    }
    case FETCH_END: {
      const { type, data } = action.response
      switch (type) {
        case FETCH_INFO_GROUP: {
          return {
            ...state,
            info: {
              ...state.info,
              group: data
            }
          }
        }
        case FETCH_INFO_COURSE: {
          return {
            ...state,
            info: {
              ...state.info,
              course: data
            }
          }
        }
        case FETCH_INFO_TEACHER: {
          return {
            ...state,
            info: {
              ...state.info,
              teacher: data
            }
          }
        }
        case FETCH_INFO_ROOM: {
          return {
            ...state,
            info: {
              ...state.info,
              room: data
            }
          }
        }
        default: {
          return state
        }
      }
    }
    default:
      return state
  }
}
