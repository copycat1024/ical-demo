// @flow

import React, { Component } from 'react'
import '../style/ical-timetable-item.less'

type TimetableItem = {
  course: string,
  teacher: string,
  location: string,
  dateSlot: number,
  timeSlot: number,
  timeSpan: number,
}

type Props = {
  item: TimetableItem,
  onClick: () => void
}

class IcalTimetableItem extends Component<Props> {
  _getInlineStyle () {
    let { dateSlot, timeSlot, timeSpan } = this.props.item
    return {
      gridRowStart: timeSlot + 1,
      gridRowEnd: timeSlot + timeSpan + 1,
      gridColumnStart: dateSlot + 1,
      gridColumnEnd: dateSlot + 2
    }
  }

  render () {
    const { onClick, item } = this.props
    const { course, teacher, location } = item
    return (
      <div
        className='ical-timetable-item text-wrap'
        style={this._getInlineStyle()}
        onClick={() => { onClick() }}
      >
        <div className='ical-timetable-item-top' />
        <p>{course}<br />{teacher}<br />{location}</p>
      </div>
    )
  }
}

export default IcalTimetableItem
