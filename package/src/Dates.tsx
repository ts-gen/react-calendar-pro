import Day from "./Day"
import { useCalendarSelector } from "./Reducer"

const Dates = () => {
  const dayList = useCalendarSelector((state) => state.calendar)

  return (
    <div className="vc-dates" data-vc="dates" aria-live="assertive" role="grid">
      {dayList.map((day) => (<Day key={day.idx} idx={day.idx} />))}
    </div>
  )
}

export default Dates