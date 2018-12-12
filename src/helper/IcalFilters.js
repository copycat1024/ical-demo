// @flow
/* global $Keys */

export const IcalItemTypeMap = {
  'group': 'Group',
  'course': 'Course',
  'teacher': 'Teacher',
  'room': 'Room',
  'empty': ''
}

export const IcalConditionTypeMap = {
  'equal': 'Equal to',
  'not_equal': 'Not equal to',
  'begin_with': 'Begin with',
  'end_with': 'End with',
  'contain': 'Contain',
  'not_contain': 'Not contain',
  'custom': 'Custom',
  'none': ''
}

export type IcalItemType = $Keys<typeof IcalItemTypeMap>
export type IcalConditionType = $Keys<typeof IcalConditionTypeMap>

export type IcalGroup = {
  code: string
}

export type IcalCourse = {
  name: string
}

export type IcalTeacher = {
  name: string,
  code: string
}

export type IcalRoom = {
  name: string
}

export type IcalItem = {
  type: IcalItemType,
  key: number
}

export type IcalFilter = {
  type: IcalItemType,
  condition: IcalConditionType,
  value: string
}

export type IcalInfo = {
  group: { [string]: IcalGroup },
  course: { [string]: IcalCourse },
  teacher: { [string]: IcalTeacher },
  room: { [string]: IcalRoom }
}

export type IcalCalendar = {
  item: IcalItem,
  filters: IcalFilter[]
}

export function strToItemType (s: string): IcalItemType {
  const maybe = Object.keys(IcalItemTypeMap).find(v => v === s)
  if (maybe == null) {
    return 'empty'
  } else {
    return maybe
  }
}

export function strToConditionType (s: string): IcalConditionType {
  const maybe = Object.keys(IcalConditionTypeMap).find(v => v === s)
  if (maybe == null) {
    return 'none'
  } else {
    return maybe
  }
}
