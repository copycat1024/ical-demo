// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapFiltersProps, mapFiltersDispatch } from '../containers/IcalGreybox'
import '../style/ical-greybox.less'
import type { IcalCalendar } from '../helper/IcalFilters'

export type IcalGreyboxDispatch = {
  doAction: (string, IcalCalendar[]) => void,
}

export type IcalFiltersProps = {
  calendars: IcalCalendar[],
  complete: boolean,
  dispatch: IcalGreyboxDispatch
}

class IcalGreybox extends Component<IcalFiltersProps> {
  render () {
    const { calendars, complete, dispatch: { doAction } } = this.props

    const styleObj = {
      backgroundColor: complete ? '#40F040' : 'white',
      color: complete ? 'black' : 'grey',
      borderColor: complete ? 'black' : 'grey',
      cursor: 'default'
    }

    return (
      <div className='ical-greybox'>
        { ['Apply', 'Export'].map((text, key) =>
          <div
            className='ical-greybox-button text-wrap'
            key={key}
            onClick={() => { doAction(text.toLowerCase(), calendars) }}
            style={styleObj}
          >
            <p style={{ cursor: 'inherit' }}> {text} </p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapFiltersProps, mapFiltersDispatch)(IcalGreybox)
