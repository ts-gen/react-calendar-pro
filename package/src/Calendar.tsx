import { type Ref, useImperativeHandle, type RefObject, type ReactNode, useEffect, type ComponentProps } from "react"
import type { Reset } from "./types"
import Year from "./Year"
import Month from "./Month"
import DefaultLayout from "./DefaultLayout"

import './styles/index.css'
import { useCalendarState } from './Reducer'

interface CalendarRef {
    show: () => void
    hide: () => void
    update: (options: Partial<Reset>) => void
}

interface CalendarProps {
    inputRef: RefObject<HTMLInputElement | null> | null
    showTime?: boolean
    onDateSelected?: (date: string) => void
    ref?: Ref<CalendarRef>
    children?: ReactNode
}

export const Calendar = ({ inputRef, onDateSelected, ref, children, ...props }: CalendarProps & Omit<ComponentProps<"div">, "ref">) => {
    const isShown = useCalendarState(state => state.isShown)
    const showCalendar = useCalendarState(state => state.show)
    const hideCalendar = useCalendarState(state => state.hide)
    const setInputElement = useCalendarState(state => state.setInputElement)
    const setOnDateSelected = useCalendarState(state => state.setOnDateSelected)
    const setTimeMode = useCalendarState(state => state.setTimeMode)

    useImperativeHandle(ref, () => {
        return {
            show: () => {
                showCalendar()
            },
            hide: () => {
                hideCalendar
            },
            update: (_options: Partial<Reset>) => {
            }
        }
    })

    useEffect(() => {
        setTimeMode(props.showTime ?? false)
    }, [props.showTime, setTimeMode])

    useEffect(() => {
        setOnDateSelected(onDateSelected)
    }, [onDateSelected, setOnDateSelected])

    useEffect(() => {
        const input = inputRef?.current
        if (!input) return

        setInputElement(inputRef)
        const handleFocus = () => {
            showCalendar()
        }

        const handleBlur = () => {
            // dispatch({ type: 'HIDE' })
        }

        input.addEventListener('focus', handleFocus)
        input.addEventListener('blur', handleBlur)

        return () => {
            input.removeEventListener('focus', handleFocus)
            input.removeEventListener('blur', handleBlur)
        }
    }, [inputRef, showCalendar, setInputElement])

    if (children === undefined) {
        return (
            <>
                {isShown && <DefaultLayout {...props} />}
            </>
        )
    }

    return (
        <>
            {isShown && children}
        </>
    )
}

Calendar.Year = Year
Calendar.Month = Month

export default Calendar