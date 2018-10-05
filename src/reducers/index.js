import { combineReducers } from 'redux'
import IcalTimetableReducer from './IcalTimetable'
import type { IcalTimetableState } from './IcalTimetable'

export type IcalState = {
  timetable: IcalTimetableState
}

const reducers = {
  timetable: IcalTimetableReducer
}

export default combineReducers(reducers)
