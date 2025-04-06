import { createContext, type Dispatch, type ReactNode, type RefObject, useContext, useReducer } from "react"
import type { LocaleInfo } from "./getLocale"
import getLocale from "./getLocale"

interface CalendarDay {
    idx: number
    date: string
    isWeekend: boolean
}

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
    calendar: CalendarDay[]
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
} | {
    type: 'PREV_MONTH'
}

const updateCalendarDay = (year: number, month: number, dayList: CalendarDay[], selectedWeekends: number[]): CalendarDay[] => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const lastDayOfMonthDate = lastDayOfMonth.getDate()
    let inRange = false
    let day = 1
    for (let i = 0; i < 42; i++) {
        if (firstDayOfWeek === i && day === 1) {
            inRange = true
        }
        if (inRange) {
            dayList[i].date = day.toString()
            day++
        } else {
            dayList[i].date = ''
        }
        dayList[i].isWeekend = selectedWeekends.includes(i % 7)
        if (day > lastDayOfMonthDate) {
            inRange = false
        }
    }

    return dayList
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
        case 'PREV_MONTH': {
            const prevDate = new Date(state.year, state.month - 1)
            state.calendar = updateCalendarDay(prevDate.getFullYear(), prevDate.getMonth(), state.calendar, state.selectedWeekends)
            return {
                ...state,
                year: prevDate.getFullYear(),
                month: prevDate.getMonth(),
                day: prevDate.getDate(),
            }
        }
        default:
            return state
    }
}

export const CalendarContext = createContext<
    { state: CalendarState, dispatch: Dispatch<CalendarAction> } | undefined
>(undefined)

const initialState = (): CalendarState => {
    const date = new Date()
    const defaultWeekends = [0, 6]
    const calendar = Array.from({ length: 42 }, (_, i) => ({
        idx: i,
        date: '',
        isWeekend: false,
    }))

    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        selectedYear: date.getFullYear(),
        selectedMonth: date.getMonth(),
        selectedDay: date.getDate(),
        locale: 'en',
        localeInfo: getLocale({ locale: 'en' }),
        show: false,
        selectedWeekends: defaultWeekends,
        mainElement: null,
        inputElement: null,
        calendar: updateCalendarDay(date.getFullYear(), date.getMonth(), calendar, defaultWeekends),
    }
}

export const CalendarProvider = ({ children }: { children?: ReactNode }) => {
    const [state, dispatch] = useReducer(calendarReducer, initialState())

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

export const useCalendarSelector = <T,>(selector: (state: CalendarState) => T): T => {
    const { state } = useCalendar()
    return selector(state)
}