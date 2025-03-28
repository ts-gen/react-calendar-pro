import Month from "./Month"
import Week from "./Week"
import Year from "./Year"

const DefaultLayout = () => {
  return (
    <>
      <div className="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
        <div className="vc-header__content" data-vc-header="content">
          <Year /> | <Month />
        </div>
        <ArrowPrev />
        <ArrowNext />
      </div>
      <div className="vc-wrapper" data-vc="wrapper">
        <WeekNumbers />
        <div class="vc-content" data-vc="content">
          <Week />
          <Dates />
          <DateRangeTooltip />
        </div>
      </div>
      <ControlTime />
    </>
  )
}

export default DefaultLayout
