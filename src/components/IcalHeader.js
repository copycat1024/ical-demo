// @flow

import React, { Component } from 'react'
import '../style/ical-header.less'

type Props = {
}

class IcalHeader extends Component<Props> {
  render () {
    return (
      <div className='ical-header'>
        <div className='ical-header-inner'>
          <div className='ical-header-logo'>
            <img src='/vamk.png' height='100%' />
          </div>
          <div className='ical-header-logout text-wrap'>
            <a>Log out</a>
          </div>
        </div>
      </div>
    )
  }
}

export default IcalHeader
