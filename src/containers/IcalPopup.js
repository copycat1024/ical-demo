// @flow

import type { Dispatch } from 'redux'
import { IcalState } from './../reducers'
import { endPopup } from '../dispatchers/IcalPopup'

export function mapFiltersProps (state: IcalState): any {
  let { show, message } = state.popup
  if (show === 'alert') {
    return {
      show: 'alert',
      content: (message != null) ? message : 'null'
    }
  }
}

export function mapFiltersDispatch (dispatch: Dispatch): any {
  return {
    dispatch: {
      endAlert: () => {
        dispatch(endPopup())
      }
    }
  }
}
