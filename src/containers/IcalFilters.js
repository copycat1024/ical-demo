// @flow

import type { Dispatch } from 'redux'
import type { IcalState } from './../reducers'
import type { IcalItem, IcalFilter } from './../helper/IcalFilters'
import {
  addCalendar,
  deleteCalendar,
  editCalendar,
  addFilter,
  editFilter,
  deleteFilter
} from './../dispatchers/IcalFilters'

export function mapFiltersProps (state: IcalState): any {
  return {
    state: state.filters
  }
}

export function mapFiltersDispatch (dispatch: Dispatch): any {
  return {
    dispatch: {
      addCalendarDispatch: () => {
        dispatch(addCalendar())
      },
      editCalendarDispatch: (key: number, item: IcalItem) => {
        dispatch(editCalendar(key, item))
      },
      deleteCalendarDispatch: (key: number) => {
        dispatch(deleteCalendar(key))
      },
      addFilterDispatch: (calKey: number) => {
        dispatch(addFilter(calKey))
      },
      editFilterDispatch: (calKey: number, key: number, item: IcalFilter) => {
        dispatch(editFilter(calKey, key, item))
      },
      deleteFilterDispatch: (calKey: number, key: number) => {
        dispatch(deleteFilter(calKey, key))
      }
    }
  }
}
