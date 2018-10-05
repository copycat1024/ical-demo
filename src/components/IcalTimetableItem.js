// @flow

import React, { Component } from 'react'
import '../style/ical-timetable-item.css'

type TimetableItem = {
  course: string,
  teacher: string,
  location: string,
  dateSlot: number,
  timeSlot: number,
  timeSpan: number
}

type Props = {
  item: TimetableItem
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
    let { course, teacher, location } = this.props.item
    let [ teacherId, teacherName ] = teacher.split(':')
    return (
      <div className='ical-timetable-item text-wrap' style={this._getInlineStyle()}>
        <div className='ical-timetable-item-top' />
        <p>{course}<br />{teacherName} ({teacherId})<br />{location}</p>
      </div>
    )
  }
}

export default IcalTimetableItem
