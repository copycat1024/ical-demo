// @flow

export const TIMETABLE_GOTO = 'TIMETABLE_GOTO'

export type timetableGotoType = 'before' | 'after' | 'now'

export type TimetableGotoAction = {
  type: 'TIMETABLE_GOTO' | '',
  destination: 'before' | 'after' | 'now'
}

export type TimetableActionType = TimetableGotoAction
