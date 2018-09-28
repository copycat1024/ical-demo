// @flow

import React, { Component } from 'react'
import IcalHeader from './IcalHeader'
import IcalBluebox from './IcalBluebox'
import IcalRedbox from './IcalRedbox'
import IcalGreybox from './IcalGreybox'
import '../style/ical-app.css'

type Props = {
}

class IcalApp extends Component<Props> {
  render () {
    return (
      <div className='ical-app'>
        <IcalHeader />
        <IcalRedbox />
        <IcalBluebox />
        <IcalGreybox />
      </div>
    )
  }
}

export default IcalApp
