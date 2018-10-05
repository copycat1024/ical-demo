// @flow

import React, { Component } from 'react'
import '../style/ical-bluebox.css'

import IcalTimetable from './IcalTimetable'

type Props = {
}

class IcalBluebox extends Component<Props> {
  render () {
    return (
      <div className='ical-bluebox'>
        <IcalTimetable />
      </div>
    )
  }
}

export default IcalBluebox
