// @flow

import React, { Fragment } from 'react'
import type { Node } from 'react'

const pad = (n) => ('0' + n).slice(-2)

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
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

export function timeToString (d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function dayDiff (d1: Date, d2: Date) {
  return Math.trunc((d1 - d2) / (24 * 3600 * 1000))
}

export function range (size:number, startAt:number = 0): number[] {
  return [...Array(size).keys()].map(i => i + startAt)
}
