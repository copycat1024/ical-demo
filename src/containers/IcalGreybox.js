// @flow

import type { Dispatch } from 'redux'
import { IcalState } from '../reducers'
import { fetchUrl } from '../dispatchers/fetch'
import { FETCH_EVENTS, FETCH_EXPORT } from '../actions/fetch'
import type { IcalCalendar } from '../helper/IcalFilters'

export function fetchEvents (dispatch: Dispatch, data: any) {
  // const attr = {
  //   method: 'GET',
  //   data: {
  //     data: data
  //   }
  // }
  dispatch(fetchUrl('mock/all_event.json', FETCH_EVENTS, {}))
}

function isComplete (calendars: IcalCalendar[]): boolean {
  for (let cal of calendars) {
    const { item: { type, key }, filters } = cal
    if (type === 'empty') return false
    if (key === -1) return false
    for (let fil of filters) {
      const { type, condition, value } = fil
      if (type === 'empty') return false
      if (condition === 'empty') return false
      if (value === '') return false
    }
  }
  return calendars.length > 0
}

export function mapFiltersProps (state: IcalState): any {
  let { calendars } = state.filters
  return {
    calendars: calendars,
    complete: isComplete(calendars)
  }
}

export function mapFiltersDispatch (dispatch: Dispatch): any {
  return {
    dispatch: {
      doAction: (action: string, calendars: IcalCalendar[]) => {
        if (!isComplete(calendars)) {
          return
        }
        if (action === 'save') {
          fetchEvents(dispatch, calendars)
        } else if (action === 'export') {
          dispatch(fetchUrl('mock/ics.json', FETCH_EXPORT, {}))
        }
      }
    }
  }
}
