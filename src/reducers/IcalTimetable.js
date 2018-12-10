// @flow

import { addDate, getSunday } from '../helper'
import { TIMETABLE_GOTO } from '../actions/IcalTimetable'
import { FETCH_END, FETCH_EVENTS } from '../actions/fetch'

import type { IcalEvent } from '../components/IcalTimetable'
import type { IcalActionType } from '../actions'

export type IcalTimetableState = {
  week: Date, // date of the sunday before the week
  events: IcalEvent[]
}

function getThisMonday () {
  return addDate(getSunday(new Date()), 1)
}

function toEvent (item) {
  return {
    course: item.courseid_id,
    location: item.roomid_id,
    teacher: item.teacherid_id,
    start: new Date(Date.parse(item.begin)),
    end: new Date(Date.parse(item.end))
  }
}

function IcalTimetableDefault (): IcalTimetableState {
  return {
    week: getThisMonday(),
    events: []
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
    case FETCH_END: {
      const { type, data } = action.response
      switch (type) {
        case FETCH_EVENTS: {
          let events = []
          console.log(data)
          data.data.map(item => {
            item.calendar.map(e => {
              events.push(toEvent(e))
            })
          })
          return {
            ...state,
            events: events
          }
        }
        default: {
          return state
        }
      }
    }
    default: {
      return state
    }
  }
}
