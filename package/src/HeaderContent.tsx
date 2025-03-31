import type { ReactNode } from "react"

export const HeaderContent = ({ children }: { children?: ReactNode }) => {

  return (
    <div className="vc-header__content" data-vc-header="content">
      {children}
    </div>
  )
}

export default HeaderContent