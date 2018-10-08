// @flow

import type { IcalState } from './../reducers'
import type { IcalTimetableProps } from './../components/IcalTimetable'

export function mapFilterBoxProps (state: IcalState): IcalTimetableProps {
  return {
    calendars: []
  }
}
