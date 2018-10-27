// @flow

import type { Dispatch } from 'redux'
import { IcalState } from './../reducers'
import type { IcalFilterState } from '../reducers/IcalFilters'

function dump (obj: any) {
  console.log(JSON.stringify(obj))
}

function isComplete (calendars: IcalFilterState): boolean {
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
  return {
    calendars: state.filters.calendars
  }
}

export function mapFiltersDispatch (dispatch: Dispatch): any {
  return {
    dispatch: {
      doAction: (action: string, calendars: IcalFilterState) => {
        if (action === 'apply') {
          if (isComplete(calendars)) {
            dump(calendars)
          } else {
            console.log('incomplete')
          }
        } else {
          dump(calendars)
        }
      }
    }
  }
}
