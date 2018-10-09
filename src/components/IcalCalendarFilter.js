// @flow
/* eslint */

import React, { Component, Fragment } from 'react'
import IcalCalendarSelect from './IcalCalendarSelect'
import { gotoXY } from '../helper'
import type { IcalFilter, IcalInfo } from './IcalFilters'

const IcalItemTypeMap = {
  'group': 'Group',
  'course': 'Course',
  'teacher': 'Teacher',
  'room': 'Room',
  'empty': ''
}
const IcalConditionTypeMap = {
  'equal': 'Equal to',
  'not_equal': 'Not equal to',
  'begin_with': 'Begin with',
  'end_with': 'End with',
  'contain': 'Contain',
  'not_contain': 'Not contain',
  'custom': 'Custom'
}

type Props = {
  filter: IcalFilter,
  info: IcalInfo,
  order: number
}

type EventHandler<E = Event> = (e: E) => void;

class IcalCalendarFilter extends Component<Props> {
  _onValueChange (e: EventHandler<>) {
    console.log(e.target.value)
  }

  render () {
    const { filter, order } = this.props
    const base = order * 3 + 2
    return (
      <Fragment>
        <div style={gotoXY(1, base)} className='ical-calendar-caption'>
          <p>Filter:</p>
        </div>
        <div style={gotoXY(2, base)} className='ical-calendar-caption'>
          <p>Filter by:</p>
        </div>
        <IcalCalendarSelect
          posX={3}
          posY={base}
          options={IcalItemTypeMap}
          value={filter.type}
        />
        <div style={gotoXY(4, base)} className='ical-calendar-delete' value={filter.value}>
          <p>X</p>
        </div>
        <div style={gotoXY(2, base + 1)} className='ical-calendar-caption'>
          <p>Condition:</p>
        </div>
        <IcalCalendarSelect
          posX={3}
          posY={base + 1}
          options={IcalConditionTypeMap}
          value={filter.condition}
        />
        <div style={gotoXY(2, base + 2)} className='ical-calendar-caption'>
          <p>Text:</p>
        </div>
        <input
          type='text'
          className='ical-calendar-input'
          style={gotoXY(3, base + 2)}
          value={filter.value}
          onChange={this._onValueChange}
        />
      </Fragment>
    )
  }
}

export default IcalCalendarFilter
