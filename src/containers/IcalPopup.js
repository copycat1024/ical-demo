// @flow

import type { Dispatch } from 'redux'
import { IcalState } from './../reducers'
import { endPopup } from '../dispatchers/IcalPopup'

export function mapPopupProps (state: IcalState): any {
  let { show, message } = state.popup
  if (show != null) {
    return {
      show: show,
      content: (message != null) ? message : 'null'
    }
  }
  return {}
}

export function mapPopupDispatch (dispatch: Dispatch): any {
  return {
    dispatch: {
      endAlert: () => {
        dispatch(endPopup())
      }
    }
  }
}
