import { useCalendar } from "./Reducer"

const Year = () => {
  const { state } = useCalendar()

  return (
    <button type="button" className="vc-year btn btn-sm" data-vc="year">{state.year}</button>
  )
}

export default Year