// @flow

export const TIMETABLE_GOTO = 'TIMETABLE_GOTO'

export type timetableGotoType = 'before' | 'after' | 'now'

export type timetableGotoAction = {
  type: 'TIMETABLE_GOTO' | '',
  destination: 'before' | 'after' | 'now'
}
