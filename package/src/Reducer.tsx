import type { RefObject } from "react"
import type { LocaleInfo } from "./getLocale"
import getLocale from "./getLocale"
import dayjs from "dayjs"
import { create } from 'zustand'

interface CalendarDay {
    idx: number
    date: number
    dateStr: string
    isHoliday: boolean
    isSelected: boolean
    isDisplay: boolean
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

const currentDate = new Date()

export const useCalendarState = create<CalendarState>()((set) => ({
    displayYear: currentDate.getFullYear(),
    displayMonth: currentDate.getMonth(),
    calendar: Array.from({ length: 42 }, (_, i) => ({ idx: i, date: 0, dateStr: '', isHoliday: false, isSelected: false, isDisplay: false })),
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
        let day = today.getDate()
        if (inputContent && hasData) {
            const parseDate = dayjs(inputContent, state.dateTimeFormat)
            if (parseDate.isValid()) {
                year = parseDate.year()
                month = parseDate.month()
                day = parseDate.date()
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
            selectedDay: isSelected ? day : undefined,
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
        const selectedMonth = state.displayMonth
        const selectedYear = state.displayYear
        const updatedCalendar = updateCalendarDay(state.displayYear, state.displayMonth, state.calendar, state.selectedWeekends,
            selectedYear, selectedMonth, selectedDay, state.holiday)
        return {
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
        if (inRange) {
            dayList[i].date = date
            dayList[i].dateStr = date.toString()
            date++
        } else {
            dayList[i].dateStr = ''
        }
        if (i > 7 && day === 0 && dayList[i].dateStr === '') {
            isDisplay = false
        }
        dayList[i].isDisplay = isDisplay
        dayList[i].isSelected = year === selectedYear && month === selectedMonth && dayList[i].date === selectedDay
        dayList[i].isHoliday = selectedWeekends.includes(day)
        if (date > lastDayOfMonthDate) {
            inRange = false
        }
    }

    console.log('[updateCalendarDay]', dayList)

    return dayList
}
