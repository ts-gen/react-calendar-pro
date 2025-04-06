import { useCalendarState } from './Reducer'

const Day = ({ idx }: { idx: number }) => {
    const dayIdx = useCalendarState((state) => state.calendar[idx].idx)
    const date = useCalendarState((state) => state.calendar[idx].dateStr)
    const isDisplay = useCalendarState((state) => state.calendar[idx].isDisplay)
    const isHoliday = useCalendarState((state) => state.calendar[idx].isHoliday)
    const isToday = useCalendarState((state) => state.calendar[idx].isToday)
    const isSelected = useCalendarState((state) => state.calendar[idx].isSelected)
    const monthState = useCalendarState((state) => state.calendar[idx].monthState)
    const setSelectedDateByIdx = useCalendarState((state) => state.setSelectedDateByIdx)

    return (
        <>
            {isDisplay && (
                <div className="vc-date" data-vc-date={date} data-vc-date-week-day={dayIdx % 7}
                    data-vc-date-month={monthState}
                    {...(isHoliday ? { 'data-vc-date-weekend': '' } : {})}
                    {...(isSelected ? { 'data-vc-date-selected': '' } : {})}
                    {...(isToday ? { 'data-vc-date-today': '' } : {})}
                    onClick={() => setSelectedDateByIdx(idx)}>
                    <button type="button" className="vc-date__btn" data-vc-date-btn={idx}>{date}</button>
                </div>
            )}
        </>
    )
}

export default Day