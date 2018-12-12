// @flow

import { GotoWeek } from '../dispatchers/IcalTimetable'
import { tz } from 'moment-timezone'
import { zone } from '../helper'
import { alertPopup } from '../dispatchers/IcalPopup'
import type { Dispatch } from 'redux'
import type { IcalState } from './../reducers'
import type { GotoWeekType } from './../actions/IcalTimetable'
import type { TimetableItem } from '../components/IcalTimetableItem'

const defaultPeriods = [
  '08:15-09:00', '09:00-09:45', '10:00-10:45', '11:00-11:45',
  '11:45-12:30', '12:30-13:15', '13:30-14:15', '14:30-15:15',
  '15:30-16:15', '16:30-17:15', '17:15-18:00'
].map(item => {
  let a = item.split('-')
  return {
    start: tz(a[0], 'hh:mm', zone).toDate(),
    end: tz(a[1], 'hh:mm', zone).toDate()
  }
})

export function mapTimetableProps (state: IcalState): any {
  const cmp = (left, right) => left.start - right.start
  const { week, events } = state.timetable
  return {
    week: week,
    dayNum: 6,
    periods: defaultPeriods,
    events: events.sort(cmp),
    info: state.filters.info
  }
}

export function mapTimetableDispatch (dispatch: Dispatch): any {
  return {
    onWeekChange: (dest: GotoWeekType) => {
      dispatch(GotoWeek(dest))
    },
    onItemClick: (item: TimetableItem) => {
      let { course, location, teacher } = item
      let itemTxt = `${course}\n${location}\n(${teacher})`
      console.log(item)
      dispatch(alertPopup(itemTxt))
    }
  }
}
