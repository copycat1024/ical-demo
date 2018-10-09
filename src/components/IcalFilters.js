// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapFiltersProps } from '../containers/IcalFilters'
import IcalCalendarBox from './IcalCalendarBox'
import '../style/ical-filters.less'

export type IcalItemType = 'group' | 'course' | 'teacher' | 'room' | 'empty'
export type IcalConditionType = 'equal' | 'not_equal' | 'begin_with' | 'end_with' | 'contain' | 'not_contain' | 'custom'

type IcalGroup = {
  code: string
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

type IcalRoom = {
  name: string
}

export type IcalItem = {
  type: IcalItemType,
  key: number,
}

export type IcalFilter = {
  type: IcalItemType,
  value: string,
  condition: IcalConditionType,
}

export type IcalInfo = {
  group: { [string]: IcalGroup },
  course: { [string]: IcalCourse },
  teacher: { [string]: IcalTeacher },
  room: { [string]: IcalRoom },
}

export type IcalCalendar = {
  item: IcalItem,
  filters: IcalFilter[]
}

export type IcalFiltersProps = {
  calendars: IcalCalendar[],
  info: IcalInfo
}

class IcalFilters extends Component<IcalFiltersProps> {
  render () {
    const { calendars, info } = this.props
    return (
      <div className='ical-filter-container'>
        <div className='ical-filter-box'>
          {calendars.map((calendar, key) => {
            return <IcalCalendarBox
              calendar={calendar}
              info={info}
              key={key}
            />
          })}
          <div className='ical-add-calendar text-wrap'>
            <p>Add calendar</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapFiltersProps)(IcalFilters)
