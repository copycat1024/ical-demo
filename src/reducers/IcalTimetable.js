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
  // lock to the 1st of February 2019
  return addDate(getSunday(new Date('01 Feb 2019 00:12:00 GMT')), 1)
  // return addDate(getSunday(new Date()), 1)
}

function toEvent (item) {
  const { group, begin, end } = item
  return {
    course: item.courseid_id,
    location: item.roomid_id,
    teacher: item.teacherid_id,
    group: group,
    start: new Date(Date.parse(begin)),
    end: new Date(Date.parse(end))
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
