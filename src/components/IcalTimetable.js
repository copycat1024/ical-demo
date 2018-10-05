// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDate, dateToString, timeToString, range, dayDiff } from './../helper'
import IcalTimetableHead from './IcalTimetableHead'
import type { TimetableHead } from './IcalTimetableHead'
import { mapTimetableProps } from './../containers/IcalTimetable'
import type { IcalTimetableState } from './../reducers/IcalTimetable'
import '../style/ical-timetable.css'
import IcalTimetableItem from './IcalTimetableItem'

export type IcalTimetableProps = IcalTimetableState

class IcalTimetable extends Component<IcalTimetableProps> {
  _getColumnHeads (): TimetableHead[] {
    const daysOfTheWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
    const { week, dayNum } = this.props
    return range(dayNum, 1).map(i => ({
      headType: 'column',
      position: i,
      position2: null,
      text: `${daysOfTheWeek[i]}\n${dateToString(addDate(week, i))}`
    }))
  }

  _getRowHeads (): TimetableHead[] {
    const { periods } = this.props
    return periods.map((item, key) => ({
      headType: 'row',
      position: key + 1,
      position2: null,
      text: `${timeToString(item.start)}\n-\n${timeToString(item.end)}`
    }))
  }

  _getCornerHeads (): TimetableHead[] {
    return [
      {
        headType: 'corner',
        position: 0,
        position2: null,
        text: ''
      }
    ]
  }

  _getFillHeads (rowCount, colCount): TimetableHead[] {
    let res = []
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        res.push({
          headType: 'fill',
          position: i + 1,
          position2: j + 1,
          text: ''
        })
      }
    }
    return res
  }

  _getTimeSlot (item, periodSlots) {
    const timeS = timeToString(item.start)
    const timeE = timeToString(item.end)
    const slotS = periodSlots.start.indexOf(timeS)
    const slotE = periodSlots.end.indexOf(timeE)
    return {
      timeSlot: slotS + 1,
      timeSpan: slotE - slotS + 1
    }
  }

  _getEvents () {
    const { events, week, dayNum } = this.props
    const { periods } = this.props
    var periodSlots = {}
    periodSlots.start = []
    periodSlots.end = []
    periods.map(item => {
      periodSlots.start.push(timeToString(item.start))
      periodSlots.end.push(timeToString(item.end))
    })
    return events.map(item => ({
      dateSlot: dayDiff(item.start, week),
      data: item
    })).filter(item => (item.dateSlot > 0 && item.dateSlot < dayNum)).map(item => ({
      dateSlot: item.dateSlot,
      teacher: item.data.description,
      course: item.data.summary,
      location: item.data.location,
      ...this._getTimeSlot(item.data, periodSlots)
    }))
  }

  render () {
    const colHeads = this._getColumnHeads()
    const rowHeads = this._getRowHeads()
    const colCount = colHeads.length
    const rowCount = rowHeads.length

    const itemWidth = 150
    const itemHeight = 75
    const headWidth = 50
    const headHeight = 50

    let heads = [
      ...colHeads,
      ...rowHeads,
      ...this._getCornerHeads(),
      ...this._getFillHeads(rowCount, colCount)
    ]

    let style = {
      width: colCount * itemWidth + headWidth,
      height: rowCount * itemHeight + headHeight,
      gridTemplateColumns: `${headWidth}px repeat(${colCount}, ${itemWidth}px)`,
      gridTemplateRows: `${headHeight}px repeat(${rowCount}, ${itemHeight}px)`
    }

    let events = this._getEvents()

    return (
      <div className='ical-timetable' style={style}>
        { heads.map((item, key) =>
          <IcalTimetableHead
            key={key}
            item={item}
          />
        )}
        { events.map((item, key) =>
          <IcalTimetableItem
            key={key}
            item={item}
          />
        )}

      </div>
    )
  }
}

export default connect(mapTimetableProps)(IcalTimetable)
