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
  value: string
}

const selectStyleObj = (x, y) => ({
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
  control: (base, state) => {
    let res = {
      ...base,
      minHeight: 0,
      height: 40,
      borderRadius: 0,
      borderColor: 'grey',
      boxShadow: null
    }
    console.log(res)
    return res
  }
})

class IcalCalendarSelect extends Component<Props> {
  _parseOptions (opt: IcalOptionsType) {
    return Object.keys(opt).map<OptionType>((key) => ({
      value: key,
      label: opt[key]
    }))
  }

  _parseValue (opt: IcalOptionsType, val: string) {
    return {
      value: val,
      label: opt[val]
    }
  }

  render () {
    const { posX, posY, options, value } = this.props
    return (
      <Select
        options={this._parseOptions(options)}
        value={this._parseValue(options, value)}
        styles={selectStyleObj(posX, posY)}
        classNamePrefix='a'
      />
    )
  }
}

export default IcalCalendarSelect
