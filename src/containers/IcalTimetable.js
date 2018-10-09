// @flow

import { GotoWeek } from '../dispatchers/IcalTimetable'
import type { Dispatch } from 'redux'
import type { IcalState } from './../reducers'
import type { GotoWeekType } from './../actions/IcalTimetable'

const defaultPeriods = [
  '08:15-09:00', '09:00-09:45', '10:00-10:45', '11:00-11:45',
  '11:45-12:30', '12:30-13:15', '13:30-14:15', '14:30-15:15',
  '15:30-16:15', '16:30-17:15', '17:15-18:00'
].map(item => {
  let a = item.split('-').map(s => s.split(':').map(n => parseInt(n)))
  return {
    start: new Date(0, 0, 0, a[0][0], a[0][1]),
    end: new Date(0, 0, 0, a[1][0], a[1][1])
  }
})

export function mapTimetableProps (state: IcalState): any {
  const cmp = (left, right) => left.start - right.start
  const { week, events } = state.timetable
  return {
    week: week,
    dayNum: 6,
    periods: defaultPeriods,
    events: events.sort(cmp)
  }
}

export function mapTimetableDispatch (dispatch: Dispatch): any {
  return {
    onWeekChange: (dest: GotoWeekType) => {
      dispatch(GotoWeek(dest))
    }
  }
}
