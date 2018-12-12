// @flow

import React, { Component } from 'react'
import '../style/ical-timetable-item.less'

export type TimetableItem = {
  course: string,
  teacher: string,
  location: string,
  dateSlot: number,
  timeSlot: number,
  timeSpan: number,
  max: number,
  order: number
}

type Props = {
  item: TimetableItem,
  onClick: () => void
}

class IcalTimetableItem extends Component<Props> {
  _getInlineStyle () {
    let { dateSlot, timeSlot, timeSpan, order, max } = this.props.item
    return {
      transform: max > 0 ? `translate(${order / max * 100}%)` : '',
      width: max > 0 ? '50%' : '100%',
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
        className='ical-timetable-wrap'
        style={this._getInlineStyle()}
        onClick={() => { onClick() }}
      >
        <div className='ical-timetable-item' lang='en'>
          <p><b>{course}</b><br />{location}<br />({teacher})</p>
        </div>
      </div>
    )
  }
}

export default IcalTimetableItem
