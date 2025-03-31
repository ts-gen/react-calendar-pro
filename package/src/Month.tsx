import { useCalendar } from "./Reducer"

const Month = () => {
  const { state } = useCalendar()

  return (
    <button type="button" className="btn btn-sm vc-month" data-vc="month">{state.localeInfo.months[state.month].short}</button>
  )
}

export default Month