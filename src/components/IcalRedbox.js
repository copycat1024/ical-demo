// @flow

import React, { Component } from 'react'
import IcalFilters from './IcalFilters'
// import '../style/Ical-app.css';

type Props = {
}

class IcalRedbox extends Component<Props> {
  render () {
    return (
      <div className='ical-redbox'>
        <IcalFilters />
      </div>
    )
  }
}

export default IcalRedbox
