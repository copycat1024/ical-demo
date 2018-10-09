// @flow

import {
  ADD_CALENDAR,
  EDIT_CALENDAR,
  DELETE_CALENDAR,
  ADD_FILTER,
  EDIT_FILTER,
  DELETE_FILTER
} from '../actions/IcalFilters'

import type { IcalActionType } from './../actions'
import type { IcalCalendar, IcalInfo } from '../helper/IcalFilters'

export type IcalFilterState = {
  calendars: IcalCalendar[],
  info: IcalInfo
}

const groupMU = {
  '1': {
    code: 'I-IT-1N1'
  },
  '2': {
    code: 'I-IT-1N2'
  },
  '3': {
    code: 'I-IT-1N3'
  },
  '4': {
    code: 'I-IT-1N4'
  }
}

const courseMU = {
  '1': {
    name: 'Data Network Services',
    credit: 5,
    language: 'en'
  },
  '2': {
    name: 'Linux Operating Systems',
    credit: 3,
    language: 'en'
  },
  '3': {
    name: 'Basics of Operating Systems',
    credit: 4,
    language: 'en'
  },
  '4': {
    name: 'Principles of Telecommunications',
    credit: 3,
    language: 'en'
  }
}

const teacherMU = {
  '1': {
    name: 'Gao Chao',
    code: 'gc'
  },
  '2': {
    name: 'Matila Jukka',
    code: 'juma'
  },
  '3': {
    name: 'Moghadampour Ghodrat',
    code: 'mg'
  }
}

const roomMU = {
  '1': {
    name: 'A2029'
  },
  '2': {
    name: 'A2038'
  },
  '3': {
    name: 'LEC1-2'
  }
}

function IcalFilterDefault (): IcalFilterState {
  return {
    calendars: [],
    info: {
      group: groupMU,
      course: courseMU,
      teacher: teacherMU,
      room: roomMU
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
    default:
      return state
  }
}
