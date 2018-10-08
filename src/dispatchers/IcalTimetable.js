import { TIMETABLE_GOTO } from './../actions/IcalTimetable'
import type { Dispatch } from 'redux'
import type { timetableGotoType, timetableGotoAction } from './../actions/IcalTimetable'

export function timetableGotoDispatch (dest: timetableGotoType) {
  return (dispatch: Dispatch) => {
    const action: timetableGotoAction = {
      type: TIMETABLE_GOTO,
      destination: dest
    }
    dispatch(action)
  }
}
