import { type Ref, useImperativeHandle, type RefObject, type ReactNode, useEffect } from "react"
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
    ref?: Ref<CalendarRef>
    children?: ReactNode
}

const Main = ({ inputRef, ref, children }: CalendarProps) => {
    const isShown = useCalendarState(state => state.isShown)
    const showCalendar = useCalendarState(state => state.show)
    const hideCalendar = useCalendarState(state => state.hide)
    const setInputElement = useCalendarState(state => state.setInputElement)

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
                {isShown && <DefaultLayout />}
            </>
        )
    }

    return (
        <>
            {isShown && children}
        </>
    )
}

export const Calendar = ({ inputRef, ref, children }: CalendarProps) => {
    return (
        <Main inputRef={inputRef} ref={ref}>
            {children}
        </Main>
    )
}

Calendar.Year = Year
Calendar.Month = Month

export default Calendar