import { useEffect, useRef } from "react"
import Month from "./Month"
import Week from "./Week"
import Year from "./Year"
import Dates from "./Dates"
import ArrowPrev from "./ArrowPrev"
import ArrowNext from "./ArrowNext"
import { useCalendar } from "./Reducer"
import Header from "./Header"
import Body from "./Body"

const DefaultLayout = () => {
  const { dispatch } = useCalendar()
  const ref = useRef<HTMLDivElement>(null)
  const renderCount = useRef(0)

  useEffect(() => {
    dispatch({ type: 'SET_MAIN_ELEMENT', payload: { mainElement: ref } })

    return () => {
      dispatch({ type: 'SET_MAIN_ELEMENT', payload: { mainElement: null } })
    }
  }, [dispatch])

  console.log('DefaultLayout Render', renderCount.current++)

  return (
    <div tabIndex={0} className="vc" data-vc="calendar" data-vc-theme="light" data-vc-type="default" role="application" ref={ref} data-vc-input="">
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
  )
}

export default DefaultLayout
