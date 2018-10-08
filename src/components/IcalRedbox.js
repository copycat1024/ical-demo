// @flow

import React, { Component } from 'react'
import IcalFilterBox from './IcalFilterBox'
// import '../style/Ical-app.css';

type Props = {
}

class IcalRedbox extends Component<Props> {
  render () {
    return (
      <div className='ical-redbox'>
        <IcalFilterBox />
      </div>
    )
  }
}

export default IcalRedbox
