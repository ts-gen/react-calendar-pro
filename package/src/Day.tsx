import { useCalendarState } from './Reducer'

const Day = ({ idx }: { idx: number }) => {
    const dayIdx = useCalendarState((state) => state.calendar[idx].idx)
    const date = useCalendarState((state) => state.calendar[idx].dateStr)
    const isHoliday = useCalendarState((state) => state.calendar[idx].isHoliday)
    const isSelected = useCalendarState((state) => state.calendar[idx].isSelected)
    const setSelectedDateByIdx = useCalendarState((state) => state.setSelectedDateByIdx)

    return (
        <div className="vc-date" data-vc-date={date} data-vc-date-week-day={dayIdx % 7}
            {...(isHoliday ? { 'data-vc-date-weekend': '' } : {})}
            {...(isSelected ? { 'data-vc-date-selected': '' } : {})}
            onClick={() => setSelectedDateByIdx(idx)}>
            <button type="button" className="vc-date__btn" data-vc-date-btn={idx}>{date}</button>
        </div>
    )
}

export default Day