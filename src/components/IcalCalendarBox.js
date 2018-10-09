// @flow

import React, { Component } from 'react'
import IcalCalendarHead from './IcalCalendarHead'
import IcalCalendarFilter from './IcalCalendarFilter'
import '../style/ical-calendar-box.less'
import { gotoXY } from '../helper'
import type { IcalCalendar, IcalInfo, IcalItem, IcalFilter } from '../helper/IcalFilters'

type Props = {
  calendar: IcalCalendar,
  info: IcalInfo,
  onEdit: (item: IcalItem) => void,
  onDelete: () => void,
  onAddFilter: () => void,
  onEditFilter: (key: number, filter: IcalFilter) => void,
  onDeleteFilter: (key: number) => void
}

class IcalCalendarBox extends Component<Props> {
  _getCalendarStyle (filterNum: number) {
    const rowHeight = 50
    const rowCount = filterNum * 3 + 2
    return {
      height: rowCount * rowHeight,
      gridTemplateRows: `repeat(${rowCount}, ${rowHeight}px)`
    }
  }

  render () {
    const { info, onDelete, onEdit, onAddFilter, onEditFilter, onDeleteFilter } = this.props
    const { item, filters } = this.props.calendar
    return (
      <div
        style={this._getCalendarStyle(filters.length)}
        className='ical-calendar-box'
      >
        <IcalCalendarHead
          item={item}
          info={info}
          onDelete={() => { onDelete() }}
          onEdit={item => onEdit(item)}
        />
        {filters.map((filter, key) =>
          <IcalCalendarFilter
            filter={filter}
            info={info}
            order={key}
            key={key}
            onDelete={() => onDeleteFilter(key)}
            onEdit={filter => onEditFilter(key, filter)}
          />
        )}
        <div
          className='ical-add-filter text-wrap'
          style={gotoXY(1, filters.length * 3 + 2, 4, 1)}
          onClick={() => onAddFilter()}
        >
          <p>Add filter</p>
        </div>
      </div>
    )
  }
}

export default IcalCalendarBox
