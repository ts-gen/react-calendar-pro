import { useCalendarState } from './Reducer'

const ArrowNext = () => {
    const nextMonth = useCalendarState(state => state.nextMonth)

    return (
        <button type="button" className="vc-arrow vc-arrow_next" data-vc-arrow="next" onClick={nextMonth} />
    )
}

export default ArrowNext