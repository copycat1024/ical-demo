// @flow

import { getSunday } from './../helper'
import testData from './test'

type IcalEvent = {
  description: string,
  location: string,
  summary: string,
  end: Date,
  start: Date
}

type IcalPeriod = {
  start: Date,
  end: Date
}

export type IcalTimetableState = {
  week: Date, // date of the sunday before the week
  dayNum: number,
  periods: IcalPeriod[],
  events: IcalEvent[]
}

const defaultPeriods = [
  '08:15-09:00', '09:00-09:45', '10:00-10:45', '11:00-11:45',
  '11:45-12:30', '12:30-13:15', '13:30-14:15', '14:30-15:15',
  '15:30-16:15', '16:30-17:15', '17:15-18:00'
].map(item => {
  let a = item.split('-').map(s => s.split(':').map(n => parseInt(n)))
  return {
    start: new Date(0, 0, 0, a[0][0], a[0][1]),
    end: new Date(0, 0, 0, a[1][0], a[1][1])
  }
})

function IcalTimetableDefault (): IcalTimetableState {
  return {
    week: getSunday(new Date()),
    dayNum: 6,
    periods: defaultPeriods,
    events: testData.data.map(item => ({
      description: item.description,
      location: item.location,
      summary: item.summary,
      start: new Date(Date.parse(item.start.dateTime)),
      end: new Date(Date.parse(item.end.dateTime))
    }))
  }
}

export default function (state: IcalTimetableState = IcalTimetableDefault(), action: null) {
  return state
}
