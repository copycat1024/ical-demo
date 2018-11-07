// @flow

import type { FiltersActionType } from './IcalFilters'
import type { TimetableActionType } from './IcalTimetable'
import type { FetchActionType } from './fetch'
import type { PopupActionType } from './IcalPopup'

export type IcalActionType = FiltersActionType | TimetableActionType | FetchActionType | PopupActionType
