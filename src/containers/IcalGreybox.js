// @flow

import type { Dispatch } from 'redux'
import { IcalState } from '../reducers'
// import { alertPopup } from '../dispatchers/IcalPopup'
import { fetchUrl } from '../dispatchers/fetch'
import { FETCH_EVENTS } from '../actions/fetch'
import type { IcalCalendar } from '../helper/IcalFilters'

function dump (obj: any) {
  console.log(JSON.stringify(obj))
}

function fetchEvents (dispatch: Dispatch, data: any) {
  data = [{
    item: {
      type: 'teacher',
      key: 'JUMA'
    },
    filters: []
  }]
  const attr = {
    method: 'POST',
    data: {
      data: data
    }
  }
  dispatch(fetchUrl('/all_event/', FETCH_EVENTS, attr))
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
        if (action === 'apply') {
          fetchEvents(dispatch, calendars)
        } else {
          dump(calendars)
        }
      }
    }
  }
}
