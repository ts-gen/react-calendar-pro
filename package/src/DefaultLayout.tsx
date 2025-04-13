import { type ComponentProps, useEffect, useRef } from "react"
import Month from "./Month"
import Week from "./Week"
import Year from "./Year"
import Dates from "./Dates"
import ArrowPrev from "./ArrowPrev"
import ArrowNext from "./ArrowNext"
import Header from "./Header"
import Body from "./Body"
import { useCalendarState } from './Reducer'
import TimeControl from './TimeControl'

const DefaultLayout = (props: Omit<ComponentProps<"input">, "ref">) => {
    const setMainElement = useCalendarState((state) => state.setMainElement)
    const ref = useRef<HTMLDivElement>(null)
    const renderCount = useRef(0)

    useEffect(() => {
        setMainElement(ref)

        return () => {
            setMainElement(null)
        }
    }, [setMainElement])

    console.log('DefaultLayout Render', renderCount.current++)

    return (
        <div {...props} tabIndex={0} className="vc" data-vc="calendar" data-vc-theme="light" data-vc-type="default" role="application" ref={ref} data-vc-input="">
            <div data-vc="main-body">
                <Header>
                    <ArrowPrev />
                    <Header.Content>
                        <Month />
                        <Year />
                    </Header.Content>
                    <ArrowNext />
                </Header>
                <Body>
                    <Body.Content>
                        <Week />
                        <Dates />
                        {/* <DateRangeTooltip /> */}
                    </Body.Content>
                </Body>
                {/* <ControlTime /> */}
            </div>
            <TimeControl />
        </div>
    )
}

export default DefaultLayout
