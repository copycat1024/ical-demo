// @flow

import React, { Component } from 'react'
import { addBr } from './../helper'
import '../style/ical-timetable-head.less'

export type TimetableHead = {
  headType: 'column' | 'row' | 'corner' | 'fill',
  position: number,
  position2: ?number,
  text: ?string
}

type Props = {
  item: TimetableHead
}

class IcalTimetableHead extends Component<Props> {
  _getInlineStyle () {
    let { headType, position, position2 } = this.props.item
    if (headType === 'fill' && position2 != null) {
      return {
        gridRowStart: position + 1,
        gridRowEnd: position + 2,
        gridColumnStart: position2 + 1,
        gridColumnEnd: position2 + 2
      }
    }
    const def = {
      gridRowStart: 1,
      gridRowEnd: 2,
      gridColumnStart: 1,
      gridColumnEnd: 2
    }
    switch (headType) {
      case 'column':
        return {
          ...def,
          gridColumnStart: position + 1,
          gridColumnEnd: position + 2
        }
      case 'row':
        return {
          ...def,
          gridRowStart: position + 1,
          gridRowEnd: position + 2
        }
      case 'corner':
        return def
    }
  }

  _getContent () {
    let { text, headType } = this.props.item
    if (text == null) {
      return null
    }
    if (headType === 'column') {
      let arr = text.split('\n')
      return [
        <p className='small' key='small'>{arr[1]}</p>,
        <p className='big' key='big'>{arr[0]}</p>
      ]
    } else {
      return <p>{addBr(text)}</p>
    }
  }

  render () {
    let { headType } = this.props.item
    let style = this._getInlineStyle()
    return (
      <div className={`ical-timetable-head-${headType} ical-timetable-head`} style={style}>
        {this._getContent()}
      </div>
    )
  }
}

export default IcalTimetableHead
