import { useCalendarState } from './Reducer'

const TimeControl = () => {
    const timeShow = useCalendarState((state) => state.timeMode)
    const hoursList = useCalendarState((state) => state.hoursList)
    const minutesList = useCalendarState((state) => state.minutesList)

    return (
        <>
            {timeShow && (
                <div data-vc="time-panel">
                    <div data-vc="time-control">
                        <div data-vc="time-header">Hrs</div>
                        <div data-vc="time-header">Mins</div>
                        <ul data-vc="time-list">
                            {hoursList.map((item) => (
                                <li key={item} data-vc="time-item">
                                    {item < 10 ? `0${item}` : item}
                                </li>
                            ))}
                        </ul>
                        <ul data-vc="time-list">
                            {minutesList.map((item) => (
                                <li key={item} data-vc="time-item">
                                    {item < 10 ? `0${item}` : item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default TimeControl