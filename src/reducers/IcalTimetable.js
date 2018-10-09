// @flow

import testData from './test'
import { addDate, getSunday } from '../helper'
import { TIMETABLE_GOTO } from '../actions/IcalTimetable'
import type { IcalEvent } from './../components/IcalTimetable'
import type { IcalActionType } from './../actions'

export type IcalTimetableState = {
  week: Date, // date of the sunday before the week
  events: IcalEvent[]
}

function getThisMonday () {
  return addDate(getSunday(new Date()), 1)
}

function IcalTimetableDefault (): IcalTimetableState {
  return {
    week: getThisMonday(),
    events: testData.data.map(item => ({
      course: item.summary,
      location: item.location,
      teacher: item.description,
      start: new Date(Date.parse(item.start.dateTime)),
      end: new Date(Date.parse(item.end.dateTime))
    }))
  }
}

export default function (state: IcalTimetableState = IcalTimetableDefault(), action: IcalActionType) {
  switch (action.type) {
    case TIMETABLE_GOTO: {
      const { destination } = action
      let newWeek = getThisMonday()
      switch (destination) {
        case 'before': {
          newWeek = addDate(state.week, -7)
          break
        }
        case 'after': {
          newWeek = addDate(state.week, 7)
          break
        }
      }
      return {
        ...state,
        week: newWeek
      }
    }
    default: {
      return state
    }
  }
}
