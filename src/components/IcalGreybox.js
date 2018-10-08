// @flow

import React, { Component } from 'react'
import '../style/ical-greybox.less'

type Props = {
}

class IcalGreybox extends Component<Props> {
  render () {
    return (
      <div className='ical-greybox'>
        { ['Google', 'Outlook'].map((text, key) =>
          <div className='ical-greybox-button text-wrap' key={key}>
            <p>{text}</p>
          </div>
        )}
      </div>
    )
  }
}

export default IcalGreybox
