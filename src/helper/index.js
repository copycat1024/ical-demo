// @flow

import React, { Fragment } from 'react'
import type { Node } from 'react'
import { tz } from 'moment-timezone'

export const zone = 'Europe/Helsinki'
// export const zone = 'Etc/GMT-3'

export function addBr (text: string): Node {
  return text.split('\n').map((item, key) =>
    <Fragment key={key}>{item}<br /></Fragment>
  )
}

export function addDate (d: Date, delta: number): Date {
  var copy = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  copy.setDate(copy.getDate() + delta)
  return copy
}

export function getSunday (d: Date): Date {
  return addDate(d, -d.getDay())
}

export function dateToString (d: Date): string {
  return tz(d, zone).format('DD.MM.YYYY')
}

export function timeToString (d: Date): string {
  return tz(d, zone).format('HH:mm')
}

export function dayDiff (d1: Date, d2: Date) {
  return Math.trunc((d1 - d2) / (24 * 3600 * 1000))
}

export function range (size:number, startAt:number = 0): number[] {
  return [...Array(size).keys()].map(i => i + startAt)
}

export function gotoXY (x: number, y: number, w:?number = 1, h:?number = 1) {
  return {
    gridRowStart: y,
    gridRowEnd: y + h,
    gridColumnStart: x,
    gridColumnEnd: x + w
  }
}
