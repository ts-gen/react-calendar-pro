import { useCalendarSelector } from "./Reducer"

const Day = ({ idx } : { idx: number}) => {

  const day = useCalendarSelector((state) => state.calendar[idx])

  if (day.isWeekend) {
    <div className="vc-date" data-vc-date={day.date} data-vc-date-week-day={day.idx % 7} data-vc-date-weekend="">
      <button type="button" className="vc-date__btn" data-vc-date-btn={day.idx}>{day.date}</button>
    </div>
  }

  return (
    <div className="vc-date" data-vc-date={day.date} data-vc-date-week-day={day.idx % 7}>
      <button type="button" className="vc-date__btn" data-vc-date-btn={day.idx}>{day.date}</button>
    </div>
  )
}

export default Day