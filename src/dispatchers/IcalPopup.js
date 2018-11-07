// @flow

import type { PopupActionType } from '../actions/IcalPopup'

import {
  POPUP_ALERT,
  POPUP_END
} from '../actions/IcalPopup'

export function alertPopup (message: string): PopupActionType {
  return {
    type: POPUP_ALERT,
    message: message
  }
}

export function endPopup (): PopupActionType {
  return {
    type: POPUP_END
  }
}
