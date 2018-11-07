// @flow

import { TIMETABLE_GOTO } from './../actions/IcalTimetable'
import type { GotoWeekType, GotoWeekAction } from './../actions/IcalTimetable'

export function GotoWeek (dest: GotoWeekType): GotoWeekAction {
  return {
    type: TIMETABLE_GOTO,
    destination: dest
  }
}
