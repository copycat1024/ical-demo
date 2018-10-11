// @flow
/* global alert */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDate, dateToString, timeToString, range, dayDiff } from './../helper'
import IcalTimetableHead from './IcalTimetableHead'
import { mapTimetableProps, mapTimetableDispatch } from './../containers/IcalTimetable'
import IcalTimetableItem from './IcalTimetableItem'
import type { GotoWeekType } from './../actions/IcalTimetable'
import type { TimetableHead } from './IcalTimetableHead'
import '../style/ical-timetable.less'

export type IcalEvent = {
  course: string,
  location: string,
  teacher: string,
  end: Date,
  start: Date
}

export type IcalPeriod = {
  start: Date,
  end: Date
}

export type IcalTimetableProps = {
  week: Date, // date of the sunday before the week
  dayNum: number,
  periods: IcalPeriod[],
  events: IcalEvent[],
  onWeekChange: (dest: GotoWeekType) => void
}

class IcalTimetable extends Component<IcalTimetableProps> {
  _getColumnHeads (): TimetableHead[] {
    const daysOfTheWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ]
    const { week, dayNum } = this.props
    return range(dayNum).map(i => {
      const d = addDate(week, i)
      return {
        headType: 'column',
        position: i + 1,
        position2: null,
        text: `${daysOfTheWeek[d.getDay()]}\n${dateToString(d)}`
      }
    })
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
    var periodSlots = {
      start: [],
      end: []
    }
    periods.map(item => {
      console.log(timeToString(item.start))
      periodSlots.start.push(timeToString(item.start))
      periodSlots.end.push(timeToString(item.end))
    })
    return events.map(item => ({
      dateSlot: dayDiff(item.start, week) + 1,
      data: item
    })).filter(item => (item.dateSlot > 0 && item.dateSlot < dayNum)).map(item => ({
      dateSlot: item.dateSlot,
      teacher: item.data.teacher,
      course: item.data.course,
      location: item.data.location,
      ...this._getTimeSlot(item.data, periodSlots),
      dbg: [ timeToString(item.data.start), item.data.start ]
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

    const heads = [
      ...colHeads,
      ...rowHeads,
      ...this._getCornerHeads(),
      ...this._getFillHeads(rowCount, colCount)
    ]

    const style = {
      width: colCount * itemWidth + headWidth,
      height: rowCount * itemHeight + headHeight,
      gridTemplateColumns: `${headWidth}px repeat(${colCount}, ${itemWidth}px)`,
      gridTemplateRows: `${headHeight}px repeat(${rowCount}, ${itemHeight}px)`
    }

    const events = this._getEvents()
    const { onWeekChange } = this.props

    return (
      <div className='ical-timetable'>
        <div className='ical-timetable-navbar'>
          <div
            className='ical-timetable-navbar-left text-wrap'
            onClick={() => { onWeekChange('before') }}
          >
            <p>&lt;</p>
          </div>
          <div
            className='ical-timetable-navbar-center text-wrap'
            onClick={() => { onWeekChange('now') }}
          >
            <p>Home</p>
          </div>
          <div
            className='ical-timetable-navbar-right text-wrap'
            onClick={() => { onWeekChange('after') }}
          >
            <p>&gt;</p>
          </div>
        </div>
        <div className='ical-timetable-body'>
          <div className='ical-timetable-content' style={style}>
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
                onClick={() => alert(JSON.stringify(item.dbg))}
              />
            )}
          </div>
        </div>
      </div>

    )
  }
}

export default connect(mapTimetableProps, mapTimetableDispatch)(IcalTimetable)
