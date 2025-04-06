import { useCalendarState } from './Reducer'

const ArrowPrev = () => {
    const prevMonth = useCalendarState(state => state.prevMonth)

    return (
        <button type="button" className="vc-arrow vc-arrow_prev" data-vc-arrow="prev" onClick={prevMonth} />
    )
}

export default ArrowPrev
