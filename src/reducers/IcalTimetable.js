// @flow

import { getSunday } from './../helper'
import testData from './test'
import type { IcalEvent } from './../components/IcalTimetable'

export type IcalTimetableState = {
  week: Date, // date of the sunday before the week
  events: IcalEvent[]
}

function IcalTimetableDefault (): IcalTimetableState {
  return {
    week: getSunday(new Date()),
    events: testData.data.map(item => ({
      course: item.summary,
      location: item.location,
      teacher: item.description,
      start: new Date(Date.parse(item.start.dateTime)),
      end: new Date(Date.parse(item.end.dateTime))
    }))
  }
}

export default function (state: IcalTimetableState = IcalTimetableDefault(), action: null) {
  return state
}
