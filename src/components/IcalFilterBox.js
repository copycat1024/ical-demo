// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapFilterBoxProps } from './../containers/IcalFilterBox'
// import '../style/Ical-app.css';

type IcalItemType = 'group' | 'course' | 'teacher' | 'room'

type IcalGroup = {
  code: string
}

type IcalRoom = {
  name: string
}

type IcalCourse = {
  name: string,
  credit: number,
  language: string
}

type IcalTeacher = {
  name: string,
  code: string
}

type IcalItem = {
  type: IcalItemType,
  key: number,
  value: IcalGroup | IcalCourse | IcalTeacher | IcalRoom
}

type IcalFilter = {
  condition: string,
  item: IcalItem
}

export type IcalCalendar = {
  item: IcalItem,
  filters: IcalFilter[]
}

export type IcalFilterBoxProps = {
  calendars: IcalCalendar[]
}

class IcalFilterBox extends Component<IcalFilterBoxProps> {
  render () {
    const { calendars } = this.props
    return (
      <div className='ical-filter-box'>
        {calendars.map((calendar, key) => {
          const { item } = calendar
          return (
            <div key={key}>{item.type}</div>
          )
        })}
      </div>
    )
  }
}

export default connect(mapFilterBoxProps)(IcalFilterBox)
