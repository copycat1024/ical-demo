// @flow

import React, { Component } from 'react'

type TimetableItem = {
  course: string,
  teacher: string
}

type Props = {
  item: TimetableItem
}

class IcalTimetableItem extends Component<Props> {
  render () {
    let { course, teacher } = this.props.item
    return (
      <div className='ical-timetable-item agenda-cell-item'>
        <p>{course}</p>
        <p>{teacher}</p>
      </div>
    )
  }
}

export default IcalTimetableItem
