// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapFiltersProps, mapFiltersDispatch } from '../containers/IcalFilters'
import IcalCalendarBox from './IcalCalendarBox'
import '../style/ical-filters.less'
import type { IcalItem, IcalFilter } from '../helper/IcalFilters'
import type { IcalFilterState } from '../reducers/IcalFilters'

export type IcalFiltersDispatch = {
  addCalendarDispatch: () => void,
  editCalendarDispatch: (key: number, item: IcalItem) => void,
  deleteCalendarDispatch: (key: number) => void,
  addFilterDispatch: (calKey: number) => void,
  editFilterDispatch: (calKey: number, key: number, item: IcalFilter) => void,
  deleteFilterDispatch: (calKey: number, key: number) => void,
}

export type IcalFiltersProps = {
  state: IcalFilterState,
  dispatch: IcalFiltersDispatch
}

class IcalFilters extends Component<IcalFiltersProps> {
  render () {
    if (this.props.state == null) {
      return null
    }
    if (this.props.dispatch == null) {
      return null
    }

    const { calendars, info } = this.props.state
    const {
      addCalendarDispatch,
      deleteCalendarDispatch,
      editCalendarDispatch,
      addFilterDispatch,
      editFilterDispatch,
      deleteFilterDispatch
    } = this.props.dispatch

    return (
      <div className='ical-filter-container'>
        <div className='ical-filter-box'>
          {calendars.map((calendar, key) => {
            return <IcalCalendarBox
              calendar={calendar}
              info={info}
              key={key}
              onDelete={() => { deleteCalendarDispatch(key) }}
              onEdit={(item) => { editCalendarDispatch(key, item) }}
              onAddFilter={() => { addFilterDispatch(key) }}
              onEditFilter={(filterKey, filter) => { editFilterDispatch(key, filterKey, filter) }}
              onDeleteFilter={(filterKey) => { deleteFilterDispatch(key, filterKey) }}
            />
          })}
          <div className='ical-add-calendar text-wrap' onClick={() => {
            addCalendarDispatch()
          }}>
            <p>Add calendar</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapFiltersProps, mapFiltersDispatch)(IcalFilters)
