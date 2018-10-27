// @flow
/* global SyntheticEvent, HTMLInputElement */

import React, { Component, Fragment } from 'react'
import IcalCalendarSelect from './IcalCalendarSelect'
import { gotoXY } from '../helper'
import type { IcalFilter, IcalInfo } from '../helper/IcalFilters'
import {
  IcalItemTypeMap,
  IcalConditionTypeMap,
  strToItemType,
  strToConditionType
} from '../helper/IcalFilters'

type Props = {
  filter: IcalFilter,
  info: IcalInfo,
  order: number,
  onEdit: (filter: IcalFilter) => void,
  onDelete: () => void
}

class IcalCalendarFilter extends Component<Props> {
  _onChangeType (type: string) {
    const { condition, value } = this.props.filter
    this.props.onEdit({
      type: strToItemType(type),
      condition: condition,
      value: value
    })
  }

  _onChangeCondition (condition: string) {
    const { type, value } = this.props.filter
    this.props.onEdit({
      type: type,
      condition: strToConditionType(condition),
      value: value
    })
  }

  _onChangeValue (e: SyntheticEvent<HTMLInputElement>) {
    const { type, condition } = this.props.filter
    const { value } = e.currentTarget
    this.props.onEdit({
      type: type,
      condition: condition,
      value: value
    })
  }

  render () {
    const { filter, order, onDelete } = this.props
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
          onEdit={value => this._onChangeType(value)}
          hightlight={filter.type === 'empty' ? 'error' : 'ok'}
        />
        <div
          style={gotoXY(4, base)}
          className='ical-calendar-delete'
          value={filter.value}
          onClick={() => onDelete()}
        >
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
          onEdit={value => this._onChangeCondition(value)}
          hightlight={filter.condition === 'none' ? 'error' : 'ok'}
        />
        <div style={gotoXY(2, base + 2)} className='ical-calendar-caption'>
          <p>Text:</p>
        </div>
        <input
          type='text'
          className='ical-calendar-input'
          style={{
            ...gotoXY(3, base + 2),
            borderColor: filter.value === '' ? '#FF0000' : '#32CD32',
            boxShadow: null,
            '&:hover': {
              borderColor: filter.value === '' ? '#8B0000' : '#008000'
            }
          }}
          value={filter.value}
          onChange={e => this._onChangeValue(e)}
        />
      </Fragment>
    )
  }
}

export default IcalCalendarFilter
