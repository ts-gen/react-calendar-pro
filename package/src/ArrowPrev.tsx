import { useCallback } from "react"
import { useCalendar } from "./Reducer"

const ArrowPrev = () => {
  const { dispatch } = useCalendar()

  const handleClick = useCallback(() => {
    dispatch({ type: 'PREV_MONTH' })
  }, [dispatch])

  return (
    <button type="button" className="vc-arrow vc-arrow_prev" data-vc-arrow="prev" onClick={handleClick} />
  )
}

export default ArrowPrev
