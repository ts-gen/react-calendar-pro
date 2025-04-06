import type { RefObject } from "react"
import type { LocaleInfo } from "./getLocale"
import getLocale from "./getLocale"
import dayjs from "dayjs"
import { create } from 'zustand'

export type MONTH_STATE = 'prev' | 'current' | 'next'

interface CalendarDay {
    idx: number
    year: number
    month: number
    date: number
    dateStr: string
    isToday: boolean
    isHoliday: boolean
    isSelected: boolean
    isDisplay: boolean
    monthState: MONTH_STATE
}

interface CalendarState {
    locale: string
    localeInfo: LocaleInfo
    mainElement?: RefObject<HTMLDivElement | null> | null
    inputElement?: RefObject<HTMLInputElement | null> | null
    displayYear: number
    displayMonth: number
    selectedYear?: number
    selectedMonth?: number
    selectedDay?: number
    selectedHour?: number
    selectedMinute?: number
    selectedWeekends: number[]
    numberOfWeeks: number
    calendar: CalendarDay[]
    isShown: boolean
    holiday: string[]
    dateFormat: string
    dateTimeFormat: string
    timeMode: boolean
    setDisplayYear: (year: number) => void
    setDisplayMonth: (month: number) => void
    setSelectedDate: (year: number, month: number, day: number) => void
    setSelectedDateByIdx: (idx: number) => void
    setSelectedHour: (hour: number) => void
    setSelectedMinute: (minute: number) => void
    setLocale: (locale: string) => void
    setWeekends: (weekends: number[]) => void
    setMainElement: (mainElement: RefObject<HTMLDivElement | null> | null) => void
    setInputElement: (inputElement: RefObject<HTMLInputElement | null> | null) => void
    setHoliday: (holiday: string[]) => void
    setTimeMode: (timeMode: boolean) => void
    prevMonth: () => void
    nextMonth: () => void
    show: () => void
    hide: () => void
}

export const useCalendarState = create<CalendarState>()((set) => ({
    displayYear: 0,
    displayMonth: 0,
    calendar: Array.from({ length: 42 }, (_, i) => (
        { idx: i, dateStr: '', isHoliday: false, isSelected: false, isDisplay: false, isToday: false, year: 0, month: 0, date: 0, monthState: 'current' }
    )),
    selectedWeekends: [0, 6],
    isShown: false,
    locale: 'en',
    localeInfo: getLocale({ locale: 'en' }),
    holiday: [],
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm',
    timeMode: false,
    numberOfWeeks: 6,
    show: () => set((state) => {
        const inputContent = state.inputElement?.current?.value
        const hasData = inputContent && inputContent.length > 0
        let isSelected = false
        const today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth()
        let date = today.getDate()
        if (inputContent && hasData) {
            const parseDate = dayjs(inputContent, state.dateTimeFormat)
            if (parseDate.isValid()) {
                year = parseDate.year()
                month = parseDate.month()
                date = parseDate.date()
                isSelected = true
            }
        }
        const updatedCalendar = updateCalendarDay(year, month, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)

        return {
            displayYear: year,
            displayMonth: month,
            selectedYear: isSelected ? year : undefined,
            selectedMonth: isSelected ? month : undefined,
            selectedDay: isSelected ? date : undefined,
            calendar: updatedCalendar,
            isShown: true,
        }
    }),
    hide: () => set({ isShown: false }),
    setLocale: (locale: string) => set(() => {
        return {
            locale,
            localeInfo: getLocale({ locale }),
        }
    }),
    setDisplayYear: (year: number) => set((state) => {
        const updatedCalendar = updateCalendarDay(year, state.displayMonth, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)
        return {
            displayYear: year,
            calendar: updatedCalendar,
        }
    }),
    setDisplayMonth: (month: number) => set((state) => {
        const updatedCalendar = updateCalendarDay(state.displayYear, month, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)
        return {
            displayMonth: month,
            calendar: updatedCalendar,
        }
    }),
    setSelectedDateByIdx: (idx: number) => set((state) => {
        const selectedDay = state.calendar[idx].date
        const selectedMonth = state.calendar[idx].month
        const selectedYear = state.calendar[idx].year
        const updatedCalendar = updateCalendarDay(state.displayYear, state.displayMonth, state.calendar, state.selectedWeekends,
            selectedYear, selectedMonth, selectedDay, state.holiday)

        if (state.inputElement?.current) {
            const date = new Date(selectedYear, selectedMonth, selectedDay)
            state.inputElement.current.value = dayjs(date).format(state.dateFormat)
            state.inputElement.current.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
        }

        return {
            isShown: false,
            calendar: updatedCalendar,
            selectedYear,
            selectedMonth,
            selectedDay,
        }
    }),
    setSelectedDate: (year: number, month: number, day: number) => set((state) => {
        const updatedCalendar = updateCalendarDay(state.displayYear, month, state.calendar, state.selectedWeekends,
            year, month, day, state.holiday)
        return {
            selectedYear: year,
            selectedMonth: month,
            selectedDay: day,
            calendar: updatedCalendar
        }
    }),
    setSelectedHour: (hour: number) => set(() => ({ selectedHour: hour })),
    setSelectedMinute: (minute: number) => set(() => ({ selectedMinute: minute })),
    setMainElement: (mainElement: RefObject<HTMLDivElement | null> | null) => set(() => ({ mainElement })),
    setInputElement: (inputElement: RefObject<HTMLInputElement | null> | null) => set(() => ({ inputElement })),
    setWeekends: (weekends: number[]) => set((state) => {
        const updatedCalendar = updateCalendarDay(state.displayYear, state.displayMonth, state.calendar, weekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)
        return {
            selectedWeekends: weekends,
            calendar: updatedCalendar,
        }
    }),
    setHoliday: (holiday: string[]) => set((state) => {
        const updatedCalendar = updateCalendarDay(state.displayYear, state.displayMonth, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, holiday)
        return {
            holiday,
            calendar: updatedCalendar,
        }
    }),
    setTimeMode: (timeMode: boolean) => set(() => ({ timeMode })),
    prevMonth: () => set((state) => {
        const month = state.displayMonth - 1 < 0 ? 11 : state.displayMonth - 1
        const year = month === 11 ? state.displayYear - 1 : state.displayYear
        const updatedCalendar = updateCalendarDay(year, month, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)
        return {
            displayYear: year,
            displayMonth: month,
            calendar: updatedCalendar,
        }
    }),
    nextMonth: () => set((state) => {
        const month = state.displayMonth + 1 > 11 ? 0 : state.displayMonth + 1
        const year = month === 0 ? state.displayYear + 1 : state.displayYear
        const updatedCalendar = updateCalendarDay(year, month, state.calendar, state.selectedWeekends,
            state.selectedYear, state.selectedMonth, state.selectedDay, state.holiday)
        return {
            displayYear: year,
            displayMonth: month,
            calendar: updatedCalendar,
        }
    }),
}))

const updateCalendarDay = (
    year: number,
    month: number,
    dayList: CalendarDay[],
    selectedWeekends: number[],
    selectedYear: number | undefined,
    selectedMonth: number | undefined,
    selectedDay: number | undefined,
    _holiday: string[]
): CalendarDay[] => {
    const today = new Date()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const lastDayOfMonthDate = lastDayOfMonth.getDate()
    let inRange = false
    let date = 1
    let day = 0
    let isDisplay = true
    for (let i = 0; i < 42; i++) {
        day = i % 7
        if (firstDayOfWeek === day && date === 1) {
            inRange = true
        }
        let dateStr = ''
        dayList[i].isToday = year === today.getFullYear() && month === today.getMonth() && date === today.getDate()
        if (inRange) {
            dateStr = date.toString()
            dayList[i].year = year
            dayList[i].month = month
            dayList[i].date = date
            dayList[i].dateStr = date.toString()
            dayList[i].monthState = 'current'
            date++
        } else {
            if (date === 1 && !inRange) {
                dateStr = ''
                const lastMonth = new Date(year, month, i - firstDayOfWeek + 1)
                dayList[i].year = lastMonth.getFullYear()
                dayList[i].month = lastMonth.getMonth()
                dayList[i].date = lastMonth.getDate()
                dayList[i].dateStr = lastMonth.getDate().toString()
                dayList[i].monthState = 'prev'
            } else if (date > lastDayOfMonthDate) {
                dateStr = ''
                const nextMonth = new Date(year, month + 1, i - lastDayOfMonthDate - 1)
                dayList[i].year = nextMonth.getFullYear()
                dayList[i].month = nextMonth.getMonth()
                dayList[i].date = nextMonth.getDate()
                dayList[i].dateStr = nextMonth.getDate().toString()
                dayList[i].monthState = 'next'
            } else {
                dateStr = ''
                dayList[i].dateStr = ''
            }
        }
        if (i > 7 && day === 0 && dateStr === '') {
            isDisplay = false
        }
        dayList[i].isDisplay = isDisplay
        dayList[i].isSelected = dayList[i].year === selectedYear && dayList[i].month === selectedMonth && dayList[i].date === selectedDay
        dayList[i].isHoliday = selectedWeekends.includes(day)
        if (date > lastDayOfMonthDate) {
            inRange = false
        }
    }

    return dayList
}
