// @flow

export const TIMETABLE_GOTO = 'TIMETABLE_GOTO'

export type GotoWeekType = 'before' | 'after' | 'now'

export type GotoWeekAction = {
  type: 'TIMETABLE_GOTO' | '',
  destination: 'before' | 'after' | 'now'
}

export type TimetableActionType = GotoWeekAction
