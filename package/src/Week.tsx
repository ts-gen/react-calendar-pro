import { useCalendarState } from './Reducer'

const Week = () => {
    const localeInfo = useCalendarState((state) => state.localeInfo)
    const selectedWeekends = useCalendarState((state) => state.selectedWeekends)

    return (
        <div data-vc="week" className="vc-week">
            {localeInfo.weekdays.map((weekday, index) => {
                const isWeekend = selectedWeekends.includes(index)
                if (isWeekend) {
                    return (
                        <div className="vc-week__day" data-vc="week" data-vc-week-day={index}
                            data-vc-week-day-off="" key={weekday.short}>{weekday.short}</div>
                    )
                }
                return (
                    <div className="vc-week__day" data-vc="week" data-vc-week-day={index}
                        key={weekday.short}>{weekday.short}</div>
                )
            })}
        </div>
    )
}

export default Week