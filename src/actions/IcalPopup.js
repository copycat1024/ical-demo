// @flow

export const POPUP_ALERT = 'POPUP_ALERT'
export const POPUP_END = 'POPUP_END'

export type PopupAlertAction = {
  type: 'POPUP_ALERT' | '',
  message: string
}

export type PopupEndAction = {
  type: 'POPUP_END' | '',
}

export type PopupActionType = PopupAlertAction | PopupEndAction
