import { useCallback, useEffect, useRef } from "react"
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
  const { dispatch, state } = useCalendar()
  const ref = useRef<HTMLDivElement>(null)
  const renderCount = useRef(0)

  const handleResize = useCallback(() => {
    if (ref.current && state.inputElement?.current) {
      const calendar = ref.current
      const input = state.inputElement.current
      const getPosition = {
        top: -calendar.offsetHeight,
        bottom: input.offsetHeight,
        left: 0,
        center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
        right: input.offsetWidth - calendar.offsetWidth,
      };
      console.log('input', input.offsetWidth, input.offsetHeight)
      console.log('calendar', calendar.offsetWidth, calendar.offsetHeight)
      console.log('getPosition', getPosition)
    }
  }, [state, state.inputElement])

  useEffect(() => {
    handleResize()
  }, [handleResize])

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
