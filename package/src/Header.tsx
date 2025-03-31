import type { ReactNode } from "react"
import HeaderContent from "./HeaderContent"

const Header = ({ children } : { children?: ReactNode}) => {
  
  return (
    <div className="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
      {children}
    </div>
  )
}

Header.Content = HeaderContent

export default Header