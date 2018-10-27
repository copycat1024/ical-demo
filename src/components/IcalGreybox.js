// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapFiltersProps, mapFiltersDispatch } from '../containers/IcalGreybox'
import '../style/ical-greybox.less'
import type { IcalFilterState } from '../reducers/IcalFilters'

export type IcalGreyboxDispatch = {
  doAction: (string, IcalFilterState) => void,
}

export type IcalFiltersProps = {
  calendars: IcalFilterState,
  dispatch: IcalGreyboxDispatch
}

class IcalGreybox extends Component<IcalFiltersProps> {
  render () {
    const { calendars, dispatch: { doAction } } = this.props

    const styleObj = {
      cursor: 'default'
    }

    return (
      <div className='ical-greybox'>
        { ['Apply', 'Export'].map((text, key) =>
          <div
            className='ical-greybox-button text-wrap'
            key={key}
            onClick={() => { doAction(text.toLowerCase(), calendars) }}
          >
            <p style={styleObj}> {text} </p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapFiltersProps, mapFiltersDispatch)(IcalGreybox)
