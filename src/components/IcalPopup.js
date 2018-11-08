// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapPopupProps, mapPopupDispatch } from '../containers/IcalPopup'
import '../style/ical-popup.less'
// import type { IcalFilterState } from '../reducers/IcalFilters'

export type IcalPopupDispatch = {
  endAlert: () => void,
}

export type IcalPopupContent = ?string

export type IcalFiltersProps = {
  show: ?string,
  content: IcalPopupContent,
  dispatch: IcalPopupDispatch
}

class IcalPopup extends Component<IcalFiltersProps> {
  _renderContent () {
    let { show, content } = this.props
    if (show == null) {
      return null
    } else if (show === 'block') {
      return content
    } else if (show === 'alert') {
      return content
    }
  }

  render () {
    let { show, dispatch: { endAlert } } = this.props
    if (show == null) return null // if show == null, do not show this popup

    return (
      <div className='ical-popup-base'>
        <div className='ical-popup-box' onClick={() => { endAlert() }}>{
          this._renderContent()
        }</div>
      </div>
    )
  }
}

export default connect(mapPopupProps, mapPopupDispatch)(IcalPopup)
