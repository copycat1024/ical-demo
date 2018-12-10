// @flow

import { FETCH_END, FETCH_START, FETCH_ERROR } from '../actions/fetch'
import { POPUP_ALERT, POPUP_END } from '../actions/IcalPopup'
import type { IcalActionType } from './../actions'

export type IcalPopupState = {
  fetchCount: number,
  show: ?string,
  message: ?string
}

function IcalPopupDefault (): IcalPopupState {
  return {
    fetchCount: 0,
    show: null,
    message: null
  }
}

export default function (state: IcalPopupState = IcalPopupDefault(), action: IcalActionType) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        fetchCount: state.fetchCount + 1
      }
    }
    case FETCH_END: {
      const { type, data } = action.response
      if (type !== FETCH_ERROR) {
        return {
          ...state,
          fetchCount: state.fetchCount - 1
        }
      } else {
        const err = JSON.parse(data.message)
        let detail = err.data
        if (detail !== 'string') {
          detail = JSON.stringify(detail)
        }
        return {
          ...state,
          show: 'alert',
          message: `Code: ${err.status}. Message: ${err.statusText}\nDetails: ${detail}`,
          fetchCount: state.fetchCount - 1
        }
      }
    }
    case POPUP_ALERT: {
      return {
        ...state,
        show: 'alert',
        message: action.message
      }
    }
    case POPUP_END: {
      return {
        ...state,
        show: null,
        message: null
      }
    }
  }
  return state
}
