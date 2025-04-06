import { useCalendarState } from './Reducer'

const Month = () => {
    const localeInfo = useCalendarState((state) => state.localeInfo)
    const displayMonth = useCalendarState((state) => state.displayMonth)

    return (
        <button type="button" className="btn btn-sm vc-month" data-vc="month">{localeInfo.months[displayMonth].short}</button>
    )
}

export default Month