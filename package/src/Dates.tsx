import { useMemo } from "react"
import { useCalendarSelector } from "./Reducer"

const Dates = () => {
  const selectedWeekends = useCalendarSelector((state) => state.selectedWeekends)
  const year = useCalendarSelector((state) => state.year)
  const month = useCalendarSelector((state) => state.month)

  const dates = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const lastDayOfMonthDate = lastDayOfMonth.getDate()
    const dates: { index: number, date: string }[] = []
    let inRange = false
    let day = 1
    for (let i = 0; i < 42; i++) {
      if (firstDayOfWeek === i && day === 1) {
        inRange = true
      }
      if (inRange) {
        dates.push({ index: i, date: day.toString() })
        day++
      } else {
        dates.push({ index: i, date: '' })
      }
      if (day > lastDayOfMonthDate) {
        inRange = false
      }
    }
    return dates
  }, [year, month])

  return (
    <div className="vc-dates" data-vc="dates" aria-live="assertive" role="grid">
      {dates.map((date) => {
        const isWeekend = selectedWeekends.includes(date.index % 7)
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