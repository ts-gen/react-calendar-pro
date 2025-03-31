import type { ReactNode } from "react"
import BodyContent from "./BodyContent"

const Body = ({ children }: { children?: ReactNode }) => {

  return (
    <div className="vc-wrapper" data-vc="wrapper">
      {children}
    </div >
  )
}

Body.Content = BodyContent

export default Body