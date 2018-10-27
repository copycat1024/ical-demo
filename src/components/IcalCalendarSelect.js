// @flow

import React, { Component } from 'react'
// $FlowIgnore
import Select from 'react-select'
import { gotoXY } from './../helper'

export type IcalOptionsType = { [string]: string }
type OptionType = {
  value: string,
  label: string
}

type Props = {
  posX: number,
  posY: number,
  options: IcalOptionsType,
  value: string,
  hightlight: string,
  onEdit: (string) => void
}

const selectStyleObj = (x, y, hightlight) => ({
  container: (base, state) => ({
    ...base,
    ...gotoXY(x, y),
    height: 40,
    margin: 5
  }),
  menu: (base, state) => ({
    ...base,
    marginBottom: 0,
    marginTop: 0
  }),
  control: (base, state) => ({
    ...base,
    minHeight: 0,
    height: 40,
    borderRadius: 0,
    borderColor: hightlight === 'error' ? '#FF0000' : '#32CD32',
    boxShadow: null,
    '&:hover': {
      borderColor: hightlight === 'error' ? '#8B0000' : '#008000'
    }
  })
})

class IcalCalendarSelect extends Component<Props> {
  _parseOptions (opt: IcalOptionsType): OptionType[] {
    return Object.keys(opt).map((key) => ({
      value: key,
      label: opt[key]
    })).filter(item => item.label !== '')
  }

  _parseValue (opt: IcalOptionsType, val: string) {
    return {
      value: val,
      label: opt[val]
    }
  }

  render () {
    const { posX, posY, options, value, onEdit, hightlight } = this.props
    return (
      <Select
        options={this._parseOptions(options)}
        value={this._parseValue(options, value)}
        styles={selectStyleObj(posX, posY, hightlight)}
        onChange={(obj, action) => { onEdit(obj.value) }}
      />
    )
  }
}

export default IcalCalendarSelect
