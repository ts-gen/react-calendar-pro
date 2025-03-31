import { type Ref, useImperativeHandle, type RefObject, type ReactNode, useEffect, useCallback } from "react"
import type { Reset } from "./types"
import Year from "./Year"
import Month from "./Month"
import { CalendarProvider, useCalendar } from "./Reducer"
import DefaultLayout from "./DefaultLayout"

import './styles/index.css'

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
  const { dispatch, state } = useCalendar()

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        dispatch({ type: 'SHOW' })
      },
      hide: () => {
        dispatch({ type: 'HIDE' })
      },
      update: (options: Partial<Reset>) => {
      }
    }
  })

  useEffect(() => {
    const input = inputRef?.current
    if (!input) return

    dispatch({ type: 'SET_INPUT_ELEMENT', payload: { inputElement: inputRef } })
    const handleFocus = () => {
      dispatch({ type: 'SHOW' })
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
  }, [inputRef, dispatch])

  if (children === undefined) {
    return (
      <>
        {state.show && <DefaultLayout />}
      </>
    )
  }

  return (
    <>
      {state.show && children}
    </>
  )
}

export const Calendar = ({ inputRef, ref, children }: CalendarProps) => {
  if (children === undefined) {
    return (
      <CalendarProvider>
      <Main inputRef={inputRef} ref={ref} />
      </CalendarProvider>
    )
  }

  return (
    <CalendarProvider>
      <Main inputRef={inputRef} ref={ref}>
        {children}
      </Main>
    </CalendarProvider>
  )
}

Calendar.Year = Year
Calendar.Month = Month

export default Calendar