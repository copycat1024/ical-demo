// @flow

import { fetchUrl } from './dispatchers/fetch'
import {
  FETCH_INFO_GROUP,
  FETCH_INFO_COURSE,
  FETCH_INFO_TEACHER,
  FETCH_INFO_ROOM,
  FETCH_SETTING
} from './actions/fetch'
import type { Store } from 'redux'

const UrlPrefix = 'mock/'
const UrlPostfix = '.json'
const InfoBuckets = [
  {
    key: 'group',
    type: FETCH_INFO_GROUP
  },
  {
    key: 'course',
    type: FETCH_INFO_COURSE
  },
  {
    key: 'teacher',
    type: FETCH_INFO_TEACHER
  },
  {
    key: 'room',
    type: FETCH_INFO_ROOM
  }
]

function loadInfo (store) {
  InfoBuckets.forEach(item => {
    const { key, type } = item
    store.dispatch(fetchUrl(`${UrlPrefix}${key}${UrlPostfix}`, type, {}))
  })
  store.dispatch(fetchUrl('mock/user.json', FETCH_SETTING, {}))
}

export default function (store: Store) {
  loadInfo(store)
}
