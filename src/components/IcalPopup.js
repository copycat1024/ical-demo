// @flow
/* eslint-env browser */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { mapPopupProps, mapPopupDispatch } from '../containers/IcalPopup'
import { addBr } from '../helper'
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
      if (content != null) {
        return addBr(content)
      }
      return ''
    } else if (show === 'link') {
      if (content == null) {
        return ''
      }
      const { url, text } = JSON.parse(content)
      const { protocol, hostname } = window.location
      const fullUrl = protocol + '//' + hostname + url
      return (
        <Fragment>
          <p>{text + ':'}</p>
          <textarea
            type='text'
            id='ics-url-text'
            value={fullUrl}
            onChange={(e) => { console.log(e.target.value) }}
            onClick={event => event.stopPropagation()} />
          <br />
          <div className='ical-popup-container'>
            <a
              href={url}
              target='_blank'
              className='ical-popup-button text-wrap'>Download</a>
            <a
              className='ical-popup-button text-wrap'
              onClick={event => {
                // nothing to see here folks, just your usual browser shenanigans
                let ele = document.getElementById('ics-url-text')
                // $FlowIgnore
                ele.select()
                // $FlowIgnore
                ele.textContent = ele.value // firefox compatibility
                // $FlowIgnore
                document.execCommand('copy')
              }} >Copy to clipboard</a>
          </div>
        </Fragment>
      )
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
