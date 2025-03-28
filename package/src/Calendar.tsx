import { type Ref, useImperativeHandle, type RefObject, type ReactNode, useEffect } from "react"
import type { Reset } from "./types"
import Year from "./Year"
import Month from "./Month"
import { CalendarProvider } from "./Reducer"

interface CalendarRef {
  show: () => void
  hide: () => void
  update: (options: Partial<Reset>) => void
}

interface CalendarProps {
  inputRef: RefObject<HTMLInputElement | null> | null
  ref: Ref<CalendarRef>
  children?: ReactNode
}

const Calendar = ({ inputRef, ref, children }: CalendarProps) => {
  useImperativeHandle(ref, () => {
    return {
      show: () => {
      },
      hide: () => {
      },
      update: (options: Partial<Reset>) => {
      }
    }
  })

  useEffect(() => {
    const input = inputRef?.current
    if (!input) return

    const handleFocus = () => {
      // @ts-ignore - we know show exists from useImperativeHandle
      ref?.current?.show()
    }

    const handleBlur = () => {
      // @ts-ignore - we know hide exists from useImperativeHandle
      ref?.current?.hide()
    }

    input.addEventListener('focus', handleFocus)
    input.addEventListener('blur', handleBlur)

    return () => {
      input.removeEventListener('focus', handleFocus)
      input.removeEventListener('blur', handleBlur)
    }
  }, [ref, inputRef])

  if (children === undefined) {
    return (
      <CalendarProvider />
    )
  }

  return (
    <CalendarProvider>
      {children}
    </CalendarProvider>
  )
}

Calendar.Year = Year
Calendar.Month = Month

export default Calendar