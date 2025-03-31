import { useMemo } from "react"
import { useCalendar } from "./Reducer"

const Dates = () => {
  const { state } = useCalendar()

  const dates = useMemo(() => {
    const firstDayOfMonth = new Date(state.year, state.month, 1)
    const lastDayOfMonth = new Date(state.year, state.month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const lastDayOfWeek = lastDayOfMonth.getDay()
    const dates: { index: number, date: string }[] = []
    let inRange = false
    let day = 1
    for (let i = 0; i < 42; i++) {
      if (firstDayOfWeek === i && !inRange) {
        inRange = true
      }
      if (inRange) {
        dates.push({ index: i, date: day.toString() })
        day++
      } else {
        dates.push({ index: i, date: '' })
      }
      if (lastDayOfWeek === i && inRange) {
        inRange = false
      }
    }
    return dates
  }, [state.year, state.month])

  console.log('[dates]', dates)

  return (
    <div className="vc-dates" data-vc="dates" aria-live="assertive" role="grid">
      {dates.map((date) => {
        const isWeekend = state.selectedWeekends.includes(date.index % 7)
        if (isWeekend) {
          return (
            <div key={date.index} className="vc-date" data-vc-date={date} data-vc-date-week-day={date.index} data-vc-date-weekend="">
              <button type="button" className="vc-date__btn" data-vc-date-btn={date}>{date.date}</button>
            </div>
          )
        }
        return (
        <div key={date.index} className="vc-date" data-vc-date={date}>
          <button type="button" className="vc-date__btn" data-vc-date-btn={date}>{date.date}</button>
        </div>
      )})}
    </div>
  )
}

export default Dates