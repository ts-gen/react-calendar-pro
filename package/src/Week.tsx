import { useCalendar } from "./Reducer"

const Week = () => {
  const { state } = useCalendar()

  return (
    <>
      {state.localeInfo.weekdays.map((weekday) => (
        <div data-vc="week" key={weekday.short}>{weekday.short}</div>
      ))}
    </>
  )
}

export default Week