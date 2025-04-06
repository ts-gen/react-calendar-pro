import { useCalendarState } from './Reducer'

const Year = () => {
    const displayYear = useCalendarState((state) => state.displayYear)

    return (
        <button type="button" className="vc-year btn btn-sm" data-vc="year">{displayYear}</button>
    )
}

export default Year