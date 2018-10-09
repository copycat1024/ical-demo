// @flow

import React, { Component } from 'react'
import IcalCalendarHead from './IcalCalendarHead'
import IcalCalendarFilter from './IcalCalendarFilter'
import type { IcalCalendar, IcalInfo, IcalItemType } from './IcalFilters'
import type { IcalOptionsType } from './IcalCalendarSelect'
import '../style/ical-calendar-box.less'
import { gotoXY } from '../helper'

type Props = {
  calendar: IcalCalendar,
  info: IcalInfo
}

export function getInfoOptions (info: IcalInfo, type: IcalItemType): IcalOptionsType {
  switch (type) {
    case 'group':
      let res = {}
      const segment = info.group
      Object.keys(segment).forEach(key => {
        res[key] = segment[key].code
      })
      return res
    default:
      return {}
  }
}

class IcalCalendarBox extends Component<Props> {
  _getCalendarStyle (filterNum: number) {
    const rowHeight = 50
    const rowCount = filterNum * 3 + 2
    return {
      height: rowCount * rowHeight,
      gridTemplateRows: `repeat(${rowCount}, ${rowHeight}px)`
    }
  }

  render () {
    const { info } = this.props
    const { item, filters } = this.props.calendar
    return (
      <div
        style={this._getCalendarStyle(filters.length)}
        className='ical-calendar-box'
      >
        <IcalCalendarHead item={item} info={info} />
        {filters.map((filter, key) =>
          <IcalCalendarFilter filter={filter} info={info} order={0} key={key} />
        )}
        <div
          className='ical-add-filter text-wrap'
          style={gotoXY(1, filters.length * 3 + 2, 4, 1)}
        >
          <p>Add filter</p>
        </div>
      </div>
    )
  }
}

export default IcalCalendarBox
