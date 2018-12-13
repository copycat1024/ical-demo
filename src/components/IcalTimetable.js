// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDate, dateToString, timeToString, range, dayDiff } from './../helper'
import IcalTimetableHead from './IcalTimetableHead'
import { mapTimetableProps, mapTimetableDispatch } from './../containers/IcalTimetable'
import IcalTimetableItem from './IcalTimetableItem'
import type { GotoWeekType } from './../actions/IcalTimetable'
import type { TimetableHead } from './IcalTimetableHead'
import type { TimetableItem } from './IcalTimetableItem'
import type { IcalInfo } from '../helper/IcalFilters'
import '../style/ical-timetable.less'

export type IcalEvent = {
  course: number,
  location: number,
  teacher: number,
  end: Date,
  start: Date,
  group: number[]
}

export type IcalPeriod = {
  start: Date,
  end: Date
}

export type IcalTimetableProps = {
  week: Date, // date of the monday at the start the week
  dayNum: number,
  periods: IcalPeriod[],
  events: IcalEvent[],
  info: IcalInfo,
  onWeekChange: (dest: GotoWeekType) => void,
  onItemClick: (item: TimetableItem) => void
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

  _itemToEvent (item: any, periodSlots) {
    const { info } = this.props
    const teacher = info.teacher[item.teacher].code.toLowerCase()
    const course = info.course[item.course].name
    const location = info.room[item.location].name
    const group = item.group.map(id => info.group[id].code)
    let timing = this._getTimeSlot(item, periodSlots)
    return {
      dateSlot: item.dateSlot,
      teacher: teacher,
      course: course,
      group: group,
      location: location,
      ...timing
    }
  }

  _addOverlap (list) {
    let pad = (item, order, max) => ({
      ...item,
      order: order,
      max: max
    })
    let last = null
    let count = 0
    let i
    let res = list.map(item => {
      if (last != null) {
        let lastEnd = last.timeSlot + last.timeSpan
        count = item.timeSlot < lastEnd ? count + 1 : 0
        if (item.dateSlot !== last.dateSlot) count = 0
      }
      last = item
      return pad(item, count, 0)
    })
    i = res.length - 1
    if (i >= 0) {
      res[i].max = res[i].order
    }
    for (i = res.length - 2; i >= 0; i--) {
      if (res[i + 1].order > 0) {
        res[i].max = res[i + 1].order
      } else {
        res[i].max = res[i].order
      }
    }
    return res
  }

  _getEvents () {
    const { events, week, dayNum, periods } = this.props
    let periodSlots = {
      start: [],
      end: []
    }
    periods.map(item => {
      periodSlots.start.push(timeToString(item.start))
      periodSlots.end.push(timeToString(item.end))
    })
    let eventList = events.map(item => ({
      ...item,
      dateSlot: dayDiff(item.start, week) + 1
    }))
      .filter(item => (item.dateSlot > 0 && item.dateSlot < dayNum))
      .map(item => this._itemToEvent(item, periodSlots))
    return this._addOverlap(eventList)
  }

  render () {
    const colHeads = this._getColumnHeads()
    const rowHeads = this._getRowHeads()
    const colCount = colHeads.length
    const rowCount = rowHeads.length

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
      height: rowCount * itemHeight + headHeight,
      gridTemplateColumns: `${headWidth}px repeat(${colCount}, 1fr)`,
      gridTemplateRows: `${headHeight}px repeat(${rowCount}, ${itemHeight}px)`
    }

    const events = this._getEvents()
    const { onWeekChange, onItemClick } = this.props

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
                onClick={() => onItemClick(item)}
              />
            )}
          </div>
        </div>
      </div>

    )
  }
}

export default connect(mapTimetableProps, mapTimetableDispatch)(IcalTimetable)
