import { createContext, type Dispatch, type ReactNode, type Ref, type RefObject, useContext, useReducer } from "react"
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
  show: boolean
  selectedWeekends: number[]
  mainElement: RefObject<HTMLDivElement | null> | null
  inputElement: RefObject<HTMLInputElement | null> | null
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
} | {
  type: 'SHOW'
} | {
  type: 'HIDE'
} | {
  type: 'SET_MAIN_ELEMENT'
  payload: {
    mainElement: RefObject<HTMLDivElement | null> | null
  }
} | {
  type: 'SET_INPUT_ELEMENT'
  payload: {
    inputElement: RefObject<HTMLInputElement | null> | null
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
    case 'SHOW':
      return { ...state, show: true }
    case 'HIDE':
      return { ...state, show: false }
    case 'SET_MAIN_ELEMENT':
      return { ...state, mainElement: action.payload.mainElement }
    case 'SET_INPUT_ELEMENT':
      return { ...state, inputElement: action.payload.inputElement }
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
    locale: 'en',
    localeInfo: getLocale({ locale: 'en' }),
    show: false,
    selectedWeekends: [0, 6],
    mainElement: null,
    inputElement: null,
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