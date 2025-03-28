import { useCalendar } from "./Reducer"

const Month = () => {
  const { state } = useCalendar()

  return (
    <button type="button" className="btn btn-sm" data-vc="month">{state.month}</button>
  )
}

export default Month