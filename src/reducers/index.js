import { combineReducers } from 'redux'
import IcalTimetableReducer from './IcalTimetable'
import IcalFilterReducer from './IcalFilters'
import IcalPopupReducer from './IcalPopup'
import type { IcalTimetableState } from './IcalTimetable'
import type { IcalFilterState } from './IcalFilters'
import type { IcalPopupState } from './IcalPopup'

export type IcalState = {
  timetable: IcalTimetableState,
  filters: IcalFilterState,
  fetch: IcalPopupState
}

const reducers = {
  timetable: IcalTimetableReducer,
  filters: IcalFilterReducer,
  popup: IcalPopupReducer
}

export default combineReducers(reducers)
