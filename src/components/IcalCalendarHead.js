// @flow

import React, { Component, Fragment } from 'react'
import IcalCalendarSelect from './IcalCalendarSelect'
import { gotoXY } from './../helper'
import { IcalItemTypeMap, strToItemType } from './../helper/IcalFilters'
import type { IcalItem, IcalInfo, IcalItemType } from '../helper/IcalFilters'
import type { IcalOptionsType } from './IcalCalendarSelect'

type Props = {
  item: IcalItem,
  info: IcalInfo,
  onDelete: () => void,
  onEdit: (item: IcalItem) => void
}

function getInfoOptions (info: IcalInfo, type: IcalItemType): IcalOptionsType {
  switch (type) {
    case 'group': {
      let res = {}
      const segment = info.group
      Object.keys(segment).forEach(key => {
        const item = segment[key]
        res[key] = item.code
      })
      return res
    }
    case 'course': {
      let res = {}
      const segment = info.course
      Object.keys(segment).forEach(key => {
        const item = segment[key]
        res[key] = `${item.name} (${item.language}, ${item.credit} cre.)`
      })
      return res
    }
    case 'teacher': {
      let res = {}
      const segment = info.teacher
      Object.keys(segment).forEach(key => {
        const item = segment[key]
        res[key] = `${item.name} (${item.code})`
      })
      return res
    }
    case 'room': {
      let res = {}
      const segment = info.room
      Object.keys(segment).forEach(key => {
        const item = segment[key]
        res[key] = item.name
      })
      return res
    }
    default:
      return {}
  }
}

class IcalCalendarHead extends Component<Props> {
  render () {
    const { item, info, onDelete, onEdit } = this.props
    return (
      <Fragment>
        <div style={gotoXY(1, 1)} className='ical-calendar-caption'>
          <p>Calendar:</p>
        </div>
        <IcalCalendarSelect
          posX={2}
          posY={1}
          options={IcalItemTypeMap}
          value={item.type}
          onEdit={value => {
            onEdit({
              type: strToItemType(value),
              key: -1
            })
          }}
          hightlight={item.type === 'empty' ? 'error' : 'ok'}
        />
        <IcalCalendarSelect
          posX={3}
          posY={1}
          options={getInfoOptions(info, item.type)}
          value={item.key.toString()}
          onEdit={value => {
            onEdit({
              type: item.type,
              key: Number(value)
            })
          }}
          hightlight={item.key.toString() === '-1' ? 'error' : 'ok'}
        />
        <div style={gotoXY(4, 1)} className='ical-calendar-delete' onClick={() => { onDelete() }}>
          <p>{'\u2715'}</p>
        </div>
      </Fragment>
    )
  }
}

export default IcalCalendarHead
