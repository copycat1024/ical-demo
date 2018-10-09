// @flow

import type { IcalState } from './../reducers'
import type { IcalFiltersProps } from './../components/IcalFilters'

const calendarMU = {
  item: {
    type: 'group',
    key: 3
  },
  filters: [
    {
      type: 'group',
      value: 'I-IT',
      condition: 'contain'
    }
  ]
}

const groupMU = {
  '1': {
    code: 'I-IT-1N1'
  },
  '2': {
    code: 'I-IT-1N2'
  },
  '3': {
    code: 'I-IT-1N3'
  },
  '4': {
    code: 'I-IT-1N4'
  }
}

const teacherMU = {
}

const roomMU = {
}

const courseMU = {
}

export function mapFiltersProps (state: IcalState): IcalFiltersProps {
  return {
    calendars: [
      calendarMU
    ],
    info: {
      course: courseMU,
      group: groupMU,
      teacher: teacherMU,
      room: roomMU
    }
  }
}
