import { combineReducers } from 'redux'
import IcalTimetableReducer from './IcalTimetable'
import IcalFilterReducer from './IcalFilters'
import type { IcalTimetableState } from './IcalTimetable'
import type { IcalFilterState } from './IcalFilters'

export type IcalState = {
  timetable: IcalTimetableState,
  filters: IcalFilterState
}

const reducers = {
  timetable: IcalTimetableReducer,
  filters: IcalFilterReducer
}

export default combineReducers(reducers)
