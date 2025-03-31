import { useCalendar } from "./Reducer"

const Week = () => {
  const { state } = useCalendar()

  return (
    <div data-vc="week" className="vc-week">
      {state.localeInfo.weekdays.map((weekday, index) => {
        const isWeekend = state.selectedWeekends.includes(index)
        if (isWeekend) {
          return (
            <div className="vc-week__day" data-vc="week" data-vc-week-day={index}
              data-vc-week-day-off="" key={weekday.short}>{weekday.short}</div>
          )
        }
        return (
          <div className="vc-week__day" data-vc="week" data-vc-week-day={index}
            key={weekday.short}>{weekday.short}</div>
        )
      })}
    </div>
  )
}

export default Week