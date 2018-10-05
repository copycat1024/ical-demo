// @flow

import type { IcalState } from './../reducers'
import type { IcalTimetableProps } from './../components/IcalTimetable'

export function mapTimetableProps (state: IcalState): IcalTimetableProps {
  const cmp = (left, right) => Date.parse(left.start.dateTime) - Date.parse(right.start.dateTime)
  return {
    ...state.timetable,
    events: state.timetable.events.sort(cmp)
  }
}
