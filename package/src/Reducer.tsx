import { createContext, type Dispatch, type ReactNode, useContext, useReducer } from "react"
import type { LocaleInfo } from "./getLocale"
import getLocale from "./getLocale"

export interface CalendarState {
  year: number
  month: number
  day: number
  selectedYear: number
  selectedMonth: number
  selectedDay: number
  locale: string
  localeInfo: LocaleInfo
}

export type CalendarAction = {
  type: 'SELECT_YEAR'
  payload: {
    year: number
  }
} | {
  type: 'SELECT_MONTH'
  payload: {
    month: number
  }
} | {
  type: 'SELECT_DAY'
  payload: {
    day: number
  }
}

const calendarReducer = (state: CalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
    case 'SELECT_YEAR':
      return { ...state, selectedYear: action.payload.year }
    case 'SELECT_MONTH':
      return { ...state, selectedMonth: action.payload.month }
    case 'SELECT_DAY':
      return { ...state, selectedDay: action.payload.day }
    default:
      return state
  }
}

export const CalendarContext = createContext<
  { state: CalendarState, dispatch: Dispatch<CalendarAction> } | undefined
>(undefined)

export const CalendarProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth(),
    selectedDay: new Date().getDate(),
    locale: 'en_US',
    localeInfo: getLocale({ locale: 'en_US' })
  })

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
}