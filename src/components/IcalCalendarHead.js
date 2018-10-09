// @flow

import React, { Component, Fragment } from 'react'
import IcalCalendarSelect from './IcalCalendarSelect'
import { getInfoOptions } from './IcalCalendarBox'
import { gotoXY } from './../helper'
import type { IcalItem, IcalInfo } from './IcalFilters'

const IcalItemTypeMap = {
  'group': 'Group',
  'course': 'Course',
  'teacher': 'Teacher',
  'room': 'Room',
  'empty': ''
}

type Props = {
  item: IcalItem,
  info: IcalInfo
}

class IcalCalendarHead extends Component<Props> {
  render () {
    const { item, info } = this.props
    return (
      <Fragment>
        <div style={gotoXY(1, 1)} className='ical-calendar-caption'>
          <p>Calendar:</p>
        </div>
        <IcalCalendarSelect
          posX={2}
          posY={1}
          options={IcalItemTypeMap}
          value={item.type}
        />
        <IcalCalendarSelect
          posX={3}
          posY={1}
          options={getInfoOptions(info, item.type)}
          value={item.key.toString()}
        />
        <div style={gotoXY(4, 1)} className='ical-calendar-delete'>
          <p>X</p>
        </div>
      </Fragment>
    )
  }
}

export default IcalCalendarHead
